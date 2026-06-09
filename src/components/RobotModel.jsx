import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle, memo } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

const MotionDiv = motion.create("div");

const SPLINE_SCENE_URL =
  "https://prod.spline.design/AfSxZV8y88wKJzGd/scene.splinecode";

// Set this to the object name/uuid from Spline's Develop panel.
const TARGET_OBJECT = "Character";

const MOOD_TO_EVENT = {
  idle: "start",
  hover: "mouseHover",
  typing: "lookAt",
  sending: "mouseDown",
  success: "mouseDown_Reverse",
  error: "mouseDown",
};

const WRAPPER_VARIANTS = {
  idle: {
    scale: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  hover: {
    scale: 1.01,
    x: 0,
    y: 0,
    rotateZ: 0,
    transition: { type: "spring", stiffness: 170, damping: 18 },
  },
  typing: {
    scale: [1, 1.005, 1],
    x: 0,
    y: 0,
    rotateZ: 0,
    transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
  },
  sending: {
    scale: [1, 1.01, 1],
    x: 0,
    y: 0,
    rotateZ: 0,
    transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
  },
  success: {
    scale: [1, 1.025, 1],
    x: 0,
    y: 0,
    rotateZ: 0,
    transition: { duration: 0.9, repeat: 1, ease: "easeInOut" },
  },
  error: {
    x: [0, -2, 2, -1, 1, 0],
    y: 0,
    rotateZ: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

const RobotModel = memo(forwardRef(({ mood = "idle", style }, ref) => {
  const containerRef = useRef(null);
  const splineAppRef = useRef(null);
  const prevMoodRef = useRef(mood);
  const [isPressed, setIsPressed] = useState(false);

  useImperativeHandle(ref, () => ({
    triggerClick: (objectName, reverse = false) => {
      const app = splineAppRef.current;
      if (!app) return;

      if (reverse) {
        if (typeof app.emitEventReverse === "function") {
          app.emitEventReverse("mouseDown", objectName);
        }
      } else {
        app.emitEvent("mouseDown", objectName);
      }
    }
  }));

  const emitToRobot = useCallback((eventName) => {
    const app = splineAppRef.current;
    if (!app || !eventName) return;

    try {
      if (eventName === "mouseDown_Reverse") {
        setTimeout(() => {
          if (typeof app?.emitEventReverse === "function") {
            app.emitEventReverse("mouseDown", TARGET_OBJECT);
          }
        }, 700);
        return;
      }

      app.emitEvent(eventName, TARGET_OBJECT);
    } catch {
      // ignore errors
    }
  }, []);

  const getZoomForWidth = useCallback((width) => {
    if (width < 480) return 0.30;   // xs
    if (width < 900) return 0.38;   // sm/md
    return 0.52;                    // desktop
  }, []);

  const handleLoad = useCallback(
    (splineApp) => {
      splineAppRef.current = splineApp;
      splineApp.setGlobalEvents(true);

      if (splineApp.controls) {
        splineApp.controls.enableZoom = false;
        splineApp.controls.isTouchZoom = false;
        splineApp.controls.zoomSpeed = 0;
        splineApp.controls.enableRotate = false;
        splineApp.controls.enablePan = false;
      }

      splineApp.setZoom(getZoomForWidth(window.innerWidth));
      emitToRobot("start");
    },
    [emitToRobot, getZoomForWidth],
  );

  useEffect(() => {
    const app = splineAppRef.current;
    if (!app) return;

    emitToRobot(MOOD_TO_EVENT[mood]);
    prevMoodRef.current = mood;
  }, [mood, emitToRobot]);

  useEffect(() => {
    const handleResize = () => {
      if (splineAppRef.current) {
        splineAppRef.current.setZoom(getZoomForWidth(window.innerWidth));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getZoomForWidth]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const preventZoom = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const preventPan = (event) => {
      if (event.buttons > 0) {
        event.stopPropagation();
      }
    };

    element.addEventListener("wheel", preventZoom, {
      passive: false,
      capture: true,
    });
    element.addEventListener("touchmove", preventZoom, {
      passive: false,
      capture: true,
    });
    element.addEventListener("pointermove", preventPan, {
      capture: true,
    });

    return () => {
      element.removeEventListener("wheel", preventZoom, true);
      element.removeEventListener("touchmove", preventZoom, true);
      element.removeEventListener("pointermove", preventPan, true);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const standardLogo = document.querySelector('a[href*="spline.design"]');
      if (standardLogo) {
        standardLogo.style.display = 'none';
        standardLogo.style.opacity = '0';
        standardLogo.style.pointerEvents = 'none';
        if (standardLogo.parentElement && standardLogo.parentElement.tagName === 'DIV') {
          standardLogo.parentElement.style.display = 'none';
        }
      }

      const splineViewers = document.querySelectorAll('spline-viewer');
      splineViewers.forEach(viewer => {
        if (viewer.shadowRoot) {
          const shadowLogo = viewer.shadowRoot.querySelector('#logo') || viewer.shadowRoot.querySelector('.spline-watermark') || viewer.shadowRoot.querySelector('a');
          if (shadowLogo) {
            shadowLogo.style.display = 'none';
            shadowLogo.style.opacity = '0';
            shadowLogo.style.pointerEvents = 'none';
          }

          if (!viewer.shadowRoot.querySelector('#hide-logo')) {
            const style = document.createElement('style');
            style.id = 'hide-logo';
            style.innerHTML = '#logo, .spline-watermark, a { display: none !important; opacity: 0 !important; pointer-events: none !important; visibility: hidden !important; }';
            viewer.shadowRoot.appendChild(style);
          }
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <MotionDiv
      ref={containerRef}
      className="spline-wrapper"
      animate={WRAPPER_VARIANTS[mood] ?? WRAPPER_VARIANTS.idle}
      whileTap={{ scale: 0.985 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        filter: isPressed ? "saturate(1.08) brightness(1.03)" : "none",
        transition: "filter 160ms ease",
        touchAction: "none",
        overscrollBehavior: "contain",
        ...style,
      }}
    >
      <Spline
        scene={SPLINE_SCENE_URL}
        onLoad={handleLoad}
      />
    </MotionDiv>
  );
}), (prevProps, nextProps) => prevProps.mood === nextProps.mood);

export default RobotModel;
