/**********************************************************************************************************************
 ***********  This is the class of model for database management
 *********************************************************************************************************************/

// interface of table

interface TableInterface {
    columns: string[],
    rows: (string[])[],
    size: number
}

export default class TableModel implements TableInterface {
    columns;
    rows;
    size;
    constructor(arr: (string[])[]) {
        this.columns = ["no column"];
        this.rows = [["no rows"]];
        this.size = 0;
        if (arr.length) {
            this.columns = ["No", ...arr[0]];
            arr.shift();
            this.rows = arr.map((row: string[], rowIdx)=> ([(rowIdx+1).toString(), ...row]));
            this.size = arr.length;
        }
    }

    showLog(): void {
        console.log("Columns", this.columns);
        console.log("Size", this.size);
    }

    
}