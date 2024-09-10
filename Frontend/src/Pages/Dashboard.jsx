import React from 'react';
import '../styles/Dashboard.css'; // Para estilos personalizados
import '../../public/Components/Tarjeta/Card.tsx'; // 

const Dashboard = () => {
  // Simular los datos de las bolsas
  const bolsas = [
    { nombre: 'Bolsa Economica', time: '25h', detalles: ['Rtx 3090 x2', '16 gb', '128 gb'], precio: '$35' },
    { nombre: 'Bolsa 2', time: '08/05/2022', detalles: ['Tarjeta Gráfica 2', 'Vram 2', 'Ram 2'], precio: '200 USD' },
    { nombre: 'Bolsa 3', time: '03/12/2022', detalles: ['Tarjeta Gráfica 3', 'Vram 3', 'Ram 3'], precio: '150 USD' },
    { nombre: 'Bolsa 4', time: '03/13/2022', detalles: ['Tarjeta Gráfica 4', 'Vram 4', 'Ram 4'], precio: '150 USD' },
    { nombre: 'Bolsa 5', time: '03/14/2022', detalles: ['Tarjeta Gráfica 5', 'Vram 5', 'Ram 5'], precio: '150 USD' },
    { nombre: 'Bolsa 6', time: '03/15/2022', detalles: ['Tarjeta Gráfica 6', 'Vram 6', 'Ram 6'], precio: '150 USD' },
    { nombre: 'Bolsa 7', time: '03/16/2022', detalles: ['Tarjeta Gráfica 7', 'Vram 7', 'Ram 7'], precio: '150 USD' },
    { nombre: 'Bolsa 8', time: '03/17/2022', detalles: ['Tarjeta Gráfica 8', 'Vram 8', 'Ram 8'], precio: '150 USD' },
    { nombre: 'Bolsa 9', time: '03/18/2022', detalles: ['Tarjeta Gráfica 9', 'Vram 9', 'Ram 9'], precio: '150 USD' },
    { nombre: 'Bolsa 10', time: '03/19/2022', detalles: ['Tarjeta Gráfica 10', 'Vram 10', 'Ram 10'], precio: '150 USD' },
    { nombre: 'Bolsa 11', time: '03/20/2022', detalles: ['Tarjeta Gráfica 11', 'Vram 11', 'Ram 11'], precio: '150 USD' },
    { nombre: 'Bolsa 12', time: '03/21/2022', detalles: ['Tarjeta Gráfica 12', 'Vram 12', 'Ram 12'], precio: '150 USD' }
  ]

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <h2>Admin_name</h2>
        </div>
        <nav className="menu">
          <ul>
            <li className='active'><a href='/dashboard'>Dashboard</a></li>
            <li><a href='/dashboard-solicitudes'>Solicitudes</a></li>
            <li><a href='/dashboard-user'>Usuarios</a></li>
            <li><a href='/dashboard-profit'>Ganancias</a></li>
            <li><a href='/dashboard-config'>Configuración</a></li>
            <li>Cerrar sesión</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-widgets">
          <div className="widget small-widget"></div>  
          <div className="widget small-widget"></div>
          <div className="widget large-widget"></div>

          <div className="bolsas-container">
            {bolsas.map((bolsa, index) => (
              <div className="bolsa-card">
              <div className="bolsa-header">
                <p className="nombre">{bolsa.nombre}</p>
                <div className="header-right">
                  <p className="time">{bolsa.time}</p>
                  <p className="price">{bolsa.precio}</p>
                </div>
              </div>
              <ul className="bolsa-details">
                {bolsa.detalles.map((detalle, i) => (
                  <li key={i}>{detalle}</li>
                ))}
              </ul>
              <div className="footer">
                <button className="Boton_Compra">¡Lo quiero!</button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

/*
  // Simular los datos de las bolsas
  const bolsas = [
    { nombre: 'Bolsa 1', time: '12/01/2022', detalles: ['Tarjeta Gráfica 1', 'Vram 1', 'Ram 1'], precio: '100 USD' },
    { nombre: 'Bolsa 2', time: '08/05/2022', detalles: ['Tarjeta Gráfica 2', 'Vram 2', 'Ram 2'], precio: '200 USD' },
    // Agrega más bolsas según sea necesario
  ];

  const handleBuyClick = (nombre) => {
    alert(`¡Compraste ${nombre}!`);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
      </aside>
      <main className="content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-widgets">
        </div>
        <div className="bolsas-container">
          {bolsas.map((bolsa, index) => (
            <Card
              key={index}
              nombre={bolsa.nombre}
              time={bolsa.time}
              detalles={bolsa.detalles}
              precio={bolsa.precio}
              onBuyClick={() => handleBuyClick(bolsa.nombre)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

*/



/*
const Dashboard = () => {
  // Simular los datos de las bolsas
  const bolsas = [
    { nombre: 'Bolsa Economica', time: '25h', detalles: ['Rtx 3090 x2', '16 gb', '128 gb'], precio: '$35' },
    { nombre: 'Bolsa 2', time: '08/05/2022', detalles: ['Tarjeta Gráfica 2', 'Vram 2', 'Ram 2'], precio: '200 USD' },
    { nombre: 'Bolsa 3', time: '03/12/2022', detalles: ['Tarjeta Gráfica 3', 'Vram 3', 'Ram 3'], precio: '150 USD' },
    { nombre: 'Bolsa 4', time: '03/13/2022', detalles: ['Tarjeta Gráfica 4', 'Vram 4', 'Ram 4'], precio: '150 USD' },
    { nombre: 'Bolsa 5', time: '03/14/2022', detalles: ['Tarjeta Gráfica 5', 'Vram 5', 'Ram 5'], precio: '150 USD' },
    { nombre: 'Bolsa 6', time: '03/15/2022', detalles: ['Tarjeta Gráfica 6', 'Vram 6', 'Ram 6'], precio: '150 USD' },
    { nombre: 'Bolsa 7', time: '03/16/2022', detalles: ['Tarjeta Gráfica 7', 'Vram 7', 'Ram 7'], precio: '150 USD' },
    { nombre: 'Bolsa 8', time: '03/17/2022', detalles: ['Tarjeta Gráfica 8', 'Vram 8', 'Ram 8'], precio: '150 USD' },
    { nombre: 'Bolsa 9', time: '03/18/2022', detalles: ['Tarjeta Gráfica 9', 'Vram 9', 'Ram 9'], precio: '150 USD' },
    { nombre: 'Bolsa 10', time: '03/19/2022', detalles: ['Tarjeta Gráfica 10', 'Vram 10', 'Ram 10'], precio: '150 USD' },
    { nombre: 'Bolsa 11', time: '03/20/2022', detalles: ['Tarjeta Gráfica 11', 'Vram 11', 'Ram 11'], precio: '150 USD' },
    { nombre: 'Bolsa 12', time: '03/21/2022', detalles: ['Tarjeta Gráfica 12', 'Vram 12', 'Ram 12'], precio: '150 USD' }
  ]

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <h2>Admin_name</h2>
        </div>
        <nav className="menu">
          <ul>
            <li className='active'><a href='/dashboard'>Dashboard</a></li>
            <li><a href='/dashboard-solicitudes'>Solicitudes</a></li>
            <li><a href='/dashboard-user'>Usuarios</a></li>
            <li><a href='/dashboard-profit'>Ganancias</a></li>
            <li><a href='/dashboard-config'>Configuración</a></li>
            <li>Cerrar sesión</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-widgets">
          <div className="widget small-widget"></div>  
          <div className="widget small-widget"></div>
          <div className="widget large-widget"></div>

          <div className="bolsas-container">
            {bolsas.map((bolsa, index) => (
              <div className="bolsa-card">
              <div className="bolsa-header">
                <p className="nombre">{bolsa.nombre}</p>
                <div className="header-right">
                  <p className="time">{bolsa.time}</p>
                  <p className="price">{bolsa.precio}</p>
                </div>
              </div>
              <ul className="bolsa-details">
                {bolsa.detalles.map((detalle, i) => (
                  <li key={i}>{detalle}</li>
                ))}
              </ul>
              <div className="footer">
                <button className="Boton_Compra">¡Lo quiero!</button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

*/


/*
import React from 'react';
import '../styles/Dashboard.css'; // Para estilos personalizados

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <h2>Admin_name</h2>
        </div>
        <nav className="menu">
          <ul>
            <li className='active'><a href='/dashboard'>Dashboard</a></li>
            <li><a href='/dashboard-solicitudes'>Solicitudes</a></li>
            <li><a href='/dashboard-user'>Usuarios</a></li>
            <li><a href='/dashboard-profit'>Ganancias</a></li>
            <li><a href='/dashboard-config'>Configuración</a></li>
            <li>Cerrar sesión</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-widgets">
          <div className="widget small-widget"></div>  
          <div className="widget small-widget"></div>
          <div className="widget large-widget"></div>

          <div className="bolsas-container">
            <div className="bolsa-card">
              <div className="bolsa-header">
                <p className="nombre">Nombre Bolsa</p>
                <p className="time">DD/HH/SS</p>
              </div>
              <ul className="bolsa-details">
                <li>Tarjeta Gráfica</li>
                <li>Vram</li>
                <li>Ram</li>
              </ul>
              <div className="footer">
                <p className="price">Precio</p>
                <button className="Boton_Compra">¡Lo quiero!</button>
                </div>
              </div>     
            </div>
        </div>
      </main>
    </div>
  );
};


export default Dashboard;
*/