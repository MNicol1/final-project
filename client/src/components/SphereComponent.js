import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const AnimatedSphere = ({ mouse }) => {
  const meshRef = useRef();

  const baseRotationSpeedY = 0.002;
  const continuousRotationY = useRef(0);

  useFrame(() => {
    // Rotate the sphere continuously

    continuousRotationY.current += baseRotationSpeedY;

    // Calculate tilt rotation based on mouse movement
    const maxRotation = Math.PI / 50; // Maximum tilt angle
    const xRotation =
      ((mouse.y - window.innerHeight / 2) / window.innerHeight) * maxRotation;
    const yRotation =
      ((mouse.x - window.innerWidth / 2) / window.innerWidth) * maxRotation;

    // Apply tilt rotation and continuous rotation separately
    meshRef.current.rotation.x = xRotation;
    meshRef.current.rotation.y = continuousRotationY.current + yRotation;
  });

  const onPointerOver = (event) => {
    document.body.style.cursor = "pointer";
  };

  const onPointerOut = (event) => {
    document.body.style.cursor = "default";
  };

  return (
    <mesh
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      ref={meshRef}
      position={[0, 0, 0]}
    >
      <sphereGeometry
        args={[
          3.5, // radius
          32, // widthSegments
          12, // heightSegments
          0, // phiStart
          Math.PI * 2, // phiLength
          3, // thetaStart
          Math.PI, // thetaLength
        ]}
      />
      <meshStandardMaterial color={"white"} wireframe />
    </mesh>
  );
};

const SphereComponent = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Exclude certain areas like fixed header
      if (event.clientX > 50 && event.clientY > 120) {
        setMouse({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  return (
    <Canvas>
      <directionalLight
        position={[5, 2, 2]}
        intensity={1}
        castShadow
        receiveShadow
      />
      <AnimatedSphere mouse={mouse} />
      {!isMobile() && <OrbitControls />}
    </Canvas>
  );
};

export default SphereComponent;
