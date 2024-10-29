import React, { useState, useEffect, useRef } from "react";
import MenuDashboard from "../../../public/Components/menuDashboard/menuDashboard";
import styles1 from "../../styles/DashboardGeneral.module.css";
import styles from "../../styles/DashboardProfit.module.css";
import LinearGraphic from "../../../public/Components/Graphics/LinearGraphic";
import logo from '../../assets/SoloLogo_Patagon.png';

const Dashboard_profit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedDiv, setExpandedDiv] = useState(null); // Estado para el gráfico expandido
  const divRefs = useRef([]); // Referencias a los divs de gráficos
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [labels2, setLabels2] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const ip_server = import.meta.env.VITE_IP;

  useEffect(() => {
    const fetchDataWeek = async () => {
      try {
        const response = await fetch(`http://${ip_server}:3003/api/command/get-users-stats-week`);
        const result = await response.json();

        const newLabels = result.map(item => item.date); 
        const newDataPoints = result.map(item => item.count);

        setLabels(newLabels);
        setDataPoints(newDataPoints);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      }
    };

    fetchDataWeek();
  }, []);

  useEffect(() => {
    const fetchData3Months = async () => {
      try {
        const response = await fetch(`http://${ip_server}:3003/api/command/get-users-stats-3months`);
        const result = await response.json();

        const newLabels2 = result.map(item => item.month); 
        const newDataPoints2 = result.map(item => item.count);

        setLabels2(newLabels2);
        setDataPoints2(newDataPoints2);
      } catch (error) {
        console.error('Error fetching 3-month data:', error);
      }
    };

    fetchData3Months();
  }, []);


  const handleExpand = (div) => {
    setExpandedDiv(expandedDiv === div ? null : div); // Toggle entre expandir y colapsar
  };

 
  const handleClickOutside = (event) => {
    if (expandedDiv && divRefs.current) {
      const isOutsideClick = divRefs.current.every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (isOutsideClick) {
        setExpandedDiv(null);
      }
    }
  };

 
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expandedDiv]);

  return (
    <div className={styles1.dashboardContainer} id={styles.black}>
      <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ""}`} id={styles.main}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon}/>
            <h1>Dashboard Profit</h1>
          </div>
        </div>
        <div className={styles.contenedor}>
          <div 
            className={`${styles.div1} ${expandedDiv === 'div1' ? styles.expanded : ''}`}
            onClick={() => handleExpand('div1')}
            ref={(el) => (divRefs.current[0] = el)} // Asignamos referencia al primer div
          >
            <LinearGraphic
              labels={labels2}
              dataPoints={dataPoints2}
              title="Ingresos últimos 3 meses"
              color="#0b6730"
            />
          </div>

          <div 
            className={`${styles.div2} ${expandedDiv === 'div2' ? styles.expanded : ''}`}
            onClick={() => handleExpand('div2')}
            ref={(el) => (divRefs.current[1] = el)} // Asignamos referencia al segundo div
          >
            <LinearGraphic
              labels={labels}
              dataPoints={dataPoints}
              title="Ingresos últimos 7 días"
              color="#0b6730"
            />
          </div>

          <div 
            className={`${styles.div3} ${expandedDiv === 'div3' ? styles.expanded : ''}`}
            onClick={() => handleExpand('div3')}
            ref={(el) => (divRefs.current[2] = el)} // Asignamos referencia al tercer div
          >
            <LinearGraphic
              labels={labels}
              dataPoints={dataPoints}
              title="Ingresos últimos 7 días"
              color="#0b6730"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard_profit;
