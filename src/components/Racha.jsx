import { onMount, createSignal, For } from "solid-js";
import { db } from '../lib/firebase'; // Importamos Firebase
import { collection, getDocs } from "firebase/firestore";

export const Racha = () => {
    const [rachas, setRachas] = createSignal([]); // Señal reactiva para las rachas

    // Función para obtener las rachas desde Firestore
    async function getRachas() {
        try {
            const querySnapshot = await getDocs(collection(db, "rachas"));
            const rachasArray = [];
            querySnapshot.forEach((doc) => {
                rachasArray.push({ id: doc.id, ...doc.data() });
            });
            return rachasArray;
        } catch (error) {
            console.error("Error al obtener las rachas: ", error);
        }
    }

    // Usamos onMount para ejecutar el código al montar el componente
    onMount(async () => {
        const data = await getRachas();
        setRachas(data); // Actualizamos la señal con los datos obtenidos
    });

    // Agrupamos los usuarios por racha
    function groupByRacha(rachas) {
        return rachas.reduce((acc, racha) => {
            if (!acc[racha.racha]) {
                acc[racha.racha] = [];
            }
            acc[racha.racha].push(racha);
            return acc;
        }, {});
    }

    const groupedRachas = () => groupByRacha(rachas());

    // Definir la lógica para obtener posiciones "top" y "left"
    function getTopPosition(racha) {
        const baseTop = {
            25: 17.7,    // Ajustado para el número 25
            30: 22.0,    // Ajustado para el número 30
            40: 26.0,    // Ajustado para el número 40
            45: 28.0,    // Ajustado para el número 45
            50: 29.2,    // Ajustado para el número 50
            60: 39.5,    // Ajustado para el número 60
            70: 44.0,    // Ajustado para el número 70
            80: 49.5,    // Ajustado para el número 80
            90: 53.0,    // Ajustado para el número 90
            100: 58.0,   // Ajustado para el número 100
            110: 61.5,   // Ajustado para el número 110
            120: 65.0,   // Ajustado para el número 120
            130: 66.5,   // Ajustado para el número 130
            140: 70.5,   // Ajustado para el número 140
            150: 76.0,   // Ajustado para el número 150
            160: 80.0,   // Ajustado para el número 160
            170: 82.5,   // Ajustado para el número 170
            180: 85.5,   // Ajustado para el número 180
            190: 90.0,   // Ajustado para el número 190
            200: 94.5    // Ajustado para el número 200
        }[racha] || 0;
        return baseTop;
    }
    
    function getLeftPosition(racha) {
        return 50; // Centrado para todos los valores
    }
    
 
    return (
        <div class="racha-container">
            {/* <img src="./img/racha.png" alt="Rachas stream" class="racha-image" /> */}

            <For each={Object.keys(groupedRachas())}>
                {(rachaValue) => (
                    <div
                        class="racha-tooltip-container"
                        style={`top: ${getTopPosition(rachaValue)}%; left: ${getLeftPosition(rachaValue)}%;`}
                    >
                        {/* Número de la racha */}
                        <div class="racha-number">
                            {rachaValue}
                        </div>

                        {/* Tooltip con el listado de usuarios */}
                        <div class="tooltip">
                            <ul class="tooltip-list">
                                <For each={groupedRachas()[rachaValue]}>
                                    {(user) => (
                                        <li class="tooltip-item">{user.nombre}</li>
                                    )}
                                </For>
                            </ul>
                        </div>
                    </div>
                )}
            </For>
        </div>
    );
};
