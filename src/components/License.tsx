import * as THREE from "three";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useCursor, MeshReflectorMaterial, Text, Environment, OrbitControls } from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import getUuid from "uuid-by-string";

//Read three.js docs and make a rotating card
/*
//HTML Functionality
const Box = () => {
  const [size, set] = useState(0.5);
  const [clicked, click] = useState(false);
  const [hidden, setVisible] = useState(false);
  return (
    <mesh scale={size * 2} onClick={(event) => click(!clicked)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"teal"} />
      <Html
        style={{
          transition: "all 0.2s",
          opacity: hidden ? 0 : 1,
          transform: `scale(${hidden ? 0.5 : 1})`,
        }}
        distanceFactor={1.5}
        position={[0, 0, 0.51]}
        transform
        occlude
        onOcclude={setVisible}
      >
        <span>Size</span>
        <Slider
          style={{ width: 100 }}
          min={0.5}
          max={1}
          step={0.01}
          value={size}
          onChange={set}
        />
      </Html>
    </mesh>
  );
};

// Side to side animation
const Sphere = (props: JSX.IntrinsicElements["mesh"]) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(
    (state) => (ref.current.position.x = Math.sin(state.clock.getElapsedTime()))
  );
  return (
    <mesh
      ref={ref}
      {...props}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={hovered ? "violet" : "orange"} />
    </mesh>
  );
};

// Lighting, Effects, and Camera
<Canvas dpr={[1, 2]} camera={{ fov: 25 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -10]} />
        <Box />
        <Sphere position={[0, 0, 1]} />
        <OrbitControls />
      </Canvas>
*/

// Need to detail the errors coming from here

const GOLDENRATIO = 1.61803398875;

const Frames = ({
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
  ...images
}) => {
  console.log(images)
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<any>(null!);
  const clicked = useRef<any>(null!);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setLocation(clicked.current === e.object ? "/" : "/item/" + e.object.name);
      }}
      onPointerMissed={() => setLocation("/")}
    >
     {Object.keys(images).map((props: any) => {
  return <Frame key={props .url} {...props} /> 
})}
    </group>
  );
};

interface ImageProps {
  position: [number, number, number];
  url: string;
  raycast?: () => null;
  alt: string;
  ref: any;
}

const Image = ({ position, url, raycast, alt }: ImageProps): ReactElement => {
  const { camera } = useThree();
  const texture = useLoader(THREE.TextureLoader, url);

  return (
    <mesh
      position={position}
      raycast={raycast}
      onPointerOver={(e) => {
        e.stopPropagation();
        camera.zoom = 1.2;
        camera.updateProjectionMatrix();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        camera.zoom = 1;
        camera.updateProjectionMatrix();
      }}
    >
      <planeGeometry args={[0.5, 0.5, 2, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

type FrameProps = {
  url: string;
  c?: THREE.Color;
  props?: any;
};

const Frame: React.FunctionComponent<FrameProps> = ({ url, c = new THREE.Color(), ...props }) => {
  const image = useRef<any>(null!);
  const frame = useRef<any>(null!);
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  useCursor(hovered);
  useFrame((state, dt) => {
    image.current.material.zoom =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    easing.damp3(
      image.current.scale,
      [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "orange" : "white",
      0.1,
      dt
    );
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => {
          e.stopPropagation()
          hover(true);
        }}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
          alt="alt"
        />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.025}
      >
        {name.split("-").join(" ")}
      </Text>
    </group>
  );
};

export default function License({...images}) {
  return (
    <div className="canvas-container h-screen w-screen">
      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={50}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5} mirror={0}            />
          </mesh>
        </group>
        <Environment preset="city" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
