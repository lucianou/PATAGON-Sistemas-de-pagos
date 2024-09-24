import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; // Asegúrate de tener esta dependencia instalada

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000", // Cambia aquí el color de fondo
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          grab: {
            distance: 400,
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3,
          },
          repulse: {
            distance: 125,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 540,
          },
        },
        color: {
          value: "#02a1f4",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
          random: true,
          anim: {
            enable: false,
            speed: 4,
            size_min: 0.3,
            sync: false,
          },
        },
        links: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 600,
          },
        },
      },
      detectRetina: false,
    }),
    [],
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Canvas de partículas */}
      <Particles 
        id={props.id} 
        init={particlesLoaded} 
        options={options} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0, // Establece un zIndex bajo para estar detrás
        }} 
      />
      {/* Contenido encima del canvas */}
      <h1 style={{ position: 'relative', zIndex: 1, color: "#ffffff" }}>Tu encabezado aquí</h1>
      {/* Agrega más contenido si es necesario */}
    </div>
  );
};

export default ParticlesComponent;
