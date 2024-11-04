import styles from "@/styles/student detail/component.module.css";

interface VariableType {
    terrainType: string;
    terrainValue: number;
}

const Terrain = ({ terrainType, terrainValue }: VariableType) => {
    const terrainImg = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Terrain_${terrainType}.png`;

    const Mood = () => {
        const y: { [key: number]: string } = {
            0: "D",
            1: "C",
            2: "B",
            3: "A",
            4: "S",
            5: "SS",
        };
        const x = y[terrainValue];
        return `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Ingame_Emo_Adaptresult${x}.png`;
    };

    return (
        <>
            <div className={styles.terrainContainer}>
                <img className={styles.terrainImg} src={terrainImg} alt="" />
                <img className={styles.terrainValue} src={Mood()} alt="" />
            </div>
        </>
    );
};

export default Terrain;
