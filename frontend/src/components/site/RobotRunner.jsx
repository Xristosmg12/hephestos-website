import { useEffect, useRef } from "react";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const raf2 = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

const EASE = {
  walk: "cubic-bezier(0.42, 0, 0.58, 1)",
  fall: "cubic-bezier(0.5, 0, 0.9, 0.55)",
  arc: "cubic-bezier(0.33, 0, 0.5, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  fly: "cubic-bezier(0.4, 0, 0.9, 0.4)",
};

export const RobotRunner = ({ active, trackRef }) => {
  const boxRef = useRef(null);
  const jumpRef = useRef(null);
  const squashRef = useRef(null);
  const svgRef = useRef(null);
  const runningRef = useRef(false);

  useEffect(() => {
    if (!active || runningRef.current) return;
    if (!trackRef.current || !boxRef.current) return;

    const box = boxRef.current;
    const jump = jumpRef.current;
    const squash = squashRef.current;
    const svg = svgRef.current;
    const GAP = 3; // feet-to-circle-top gap
    const MARGIN = 12; // clearance from circle edge when on the line

    if (!trackRef.current.querySelector('[data-node="0"]')) return;
    runningRef.current = true;
    let alive = true;

    const pose = (c) => svg && svg.setAttribute("class", "robot" + (c ? " " + c : ""));

    const coords = (i) => {
      const track = trackRef.current;
      const node = track.querySelector(`[data-node="${i}"]`);
      if (!node) return null;
      const t = track.getBoundingClientRect();
      const n = node.getBoundingClientRect();
      return {
        cx: n.left - t.left + n.width / 2,
        line: n.top - t.top + n.height / 2,
        circleTop: n.top - t.top,
        r: n.height / 2,
        node,
      };
    };

    const jiggleNode = (node) => {
      node.classList.add("node-jiggle");
      setTimeout(() => node.classList.remove("node-jiggle"), 460);
    };

    const squashLand = async (sx = 1.3, sy = 0.7) => {
      squash.style.transition = "transform 100ms cubic-bezier(0.4,0,0.6,1)";
      squash.style.transform = `scaleX(${sx}) scaleY(${sy})`;
      await wait(100);
      squash.style.transition = `transform 220ms ${EASE.spring}`;
      squash.style.transform = "scaleX(1) scaleY(1)";
      await wait(220);
    };

    // Jump: horizontal move on box + vertical hump on jump wrapper
    const doJump = async (targetX, targetFeetY, { dur = 450, peak = 34 } = {}) => {
      pose("");
      box.style.transition = `left ${dur}ms ${EASE.arc}, top ${dur}ms ${EASE.arc}`;
      box.style.left = `${targetX}px`;
      box.style.top = `${targetFeetY}px`;
      jump.style.setProperty("--peak", `${peak}px`);
      jump.classList.remove("rb-jump");
      void jump.offsetWidth; // restart animation
      jump.classList.add("rb-jump");
      await wait(dur);
      jump.classList.remove("rb-jump");
    };

    const crouch = async () => {
      pose("crouch");
      squash.style.transition = `transform 200ms ${EASE.spring}`;
      squash.style.transform = "scaleX(1.1) scaleY(0.75) translateY(3px)";
      await wait(500);
      squash.style.transform = "scaleX(1) scaleY(1)";
      pose("");
    };

    const walkTo = async (x, dur) => {
      pose("walking");
      box.style.transition = `left ${dur}ms ${EASE.walk}`;
      box.style.left = `${x}px`;
      await wait(dur);
      pose("");
    };

    const laptopSession = async () => {
      pose("working");
      await wait(1800);
      if (!alive) return;
      pose("");
      await wait(340);
    };

    const loop = async () => {
      while (alive) {
        const n1 = coords(0), n2 = coords(1), n3 = coords(2);
        if (!n1 || !n2 || !n3) break;
        const topFeet = (n) => n.circleTop - GAP;

        // PHASE 1 — drop onto Node 1 from above
        box.style.transition = "none";
        box.style.left = `${n1.cx}px`;
        box.style.top = `${topFeet(n1) - 62}px`;
        box.style.opacity = "0";
        pose("");
        await raf2();
        if (!alive) break;
        box.style.opacity = "1";
        box.style.transition = `top 400ms ${EASE.fall}`;
        box.style.top = `${topFeet(n1)}px`;
        await wait(400);
        if (!alive) break;
        await squashLand();
        jiggleNode(n1.node);

        // PHASE 2 — laptop at Node 1
        await laptopSession();
        if (!alive) break;

        // PHASE 3 — jump OFF node 1 down to the line (clear of the circle), walk to edge of node 2
        await doJump(n1.cx + n1.r + MARGIN, n1.line, { dur: 400, peak: 26 });
        await squashLand(1.2, 0.82);
        await walkTo(n2.cx - n2.r - MARGIN, 1500);
        if (!alive) break;

        // PHASE 4 + 5 — crouch, then jump UP onto Node 2 (arc around the circle)
        await crouch();
        await doJump(n2.cx, topFeet(n2), { dur: 460, peak: 40 });
        await squashLand();
        jiggleNode(n2.node);

        // PHASE 6 — laptop at Node 2
        await laptopSession();
        if (!alive) break;

        // PHASE 7 — jump OFF node 2 to the line, walk to edge of node 3
        await doJump(n2.cx + n2.r + MARGIN, n2.line, { dur: 400, peak: 26 });
        await squashLand(1.2, 0.82);
        await walkTo(n3.cx - n3.r - MARGIN, 1500);
        if (!alive) break;

        // PHASE 8 — crouch, then jump UP onto Node 3
        await crouch();
        await doJump(n3.cx, topFeet(n3), { dur: 460, peak: 40 });
        await squashLand();
        jiggleNode(n3.node);

        // PHASE 9 — laptop, wave, fly off
        pose("working");
        await wait(1800);
        if (!alive) break;
        pose("");
        await wait(240);
        pose("waving");
        await wait(900);
        if (!alive) break;

        const tw = trackRef.current.clientWidth;
        box.style.transition = `left 750ms ${EASE.fly}, top 750ms ${EASE.arc}, opacity 750ms ease`;
        box.style.left = `${tw + 140}px`;
        box.style.top = `${n3.circleTop - 130}px`;
        box.style.opacity = "0";
        await wait(750);
        await wait(800);
      }
    };

    loop();
    return () => {
      alive = false;
      runningRef.current = false;
    };
  }, [active, trackRef]);

  return (
    <div
      ref={boxRef}
      className="absolute left-0 top-0 pointer-events-none"
      style={{ zIndex: 9999, transform: "translate(-50%, -100%)", opacity: 0 }}
    >
      <div ref={jumpRef}>
        <div ref={squashRef} className="rb-inner">
          <svg ref={svgRef} className="robot" width="36" height="26" viewBox="0 0 42 30" fill="none">
            {/* laptop (right of robot) */}
            <g className="laptop">
              <rect x="19" y="20" width="15" height="2.6" rx="0.7" fill="#131417" stroke="#E8EAED" strokeWidth="0.6" />
              <g className="laptop-lid">
                <rect x="19" y="12" width="13" height="8" rx="0.7" fill="#0B0B0D" stroke="#E8EAED" strokeWidth="0.7" />
                <rect x="19.8" y="12.8" width="11.4" height="6.4" rx="0.4" fill="#E8EAED" opacity="0.55" />
                <rect className="laptop-cursor" x="21" y="14" width="0.9" height="3" fill="#ffffff" />
              </g>
            </g>
            {/* arms */}
            <rect className="arm-l" x="3" y="11" width="1.7" height="6" rx="0.8" fill="#E8EAED" />
            <rect className="arm-r" x="14.8" y="11" width="1.7" height="6" rx="0.8" fill="#E8EAED" />
            {/* legs */}
            <rect className="leg-l" x="7.2" y="20" width="1.8" height="5.5" rx="0.8" fill="#E8EAED" />
            <rect className="leg-r" x="11.2" y="20" width="1.8" height="5.5" rx="0.8" fill="#E8EAED" />
            {/* body */}
            <rect x="5.5" y="10.5" width="9" height="9.5" rx="1" fill="#E8EAED" />
            {/* head */}
            <rect x="5" y="1" width="10" height="8.5" rx="1.5" fill="#8A8D93" />
            <circle cx="8" cy="4.8" r="1.1" fill="#fff" />
            <circle cx="12" cy="4.8" r="1.1" fill="#fff" />
            <line x1="8" y1="7.2" x2="12" y2="7.2" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
