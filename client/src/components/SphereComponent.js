import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const AnimatedSphere = () => {
  const meshRef = useRef();

  const baseRotationSpeedY = 0.002;

  useFrame(() => {
    // Rotate the sphere continuously
    meshRef.current.rotation.y += baseRotationSpeedY;
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
      <AnimatedSphere />
      {!isMobile() && <OrbitControls />}
    </Canvas>
  );
};

export default SphereComponent;
