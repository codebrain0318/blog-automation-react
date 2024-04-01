import { createDataService } from './Excel';
import TableModel from '../../utils/TableModel/TableModel';
import config from '../../config/Global';
import { loginService } from '../Auth/Auth';

describe("Check creation of excel database for user", () => {
    it ( "without authorization", async() => {
        const cols = ["No", "param1", "param2"];
        const rows = [["1", "row1", "row2"],["2", "row1", "row2"],["3", "row1", "row2"]];
        const tableModel = new TableModel([]);
        tableModel.columns = cols;
        tableModel.rows = rows;
        const response = await createDataService(tableModel);
        expect(response).toEqual(null)
    })

    it ( "with authorization", async () => {
        const username = "A";
        const password = 'a';
        const loginResponse = await loginService(username, password);
        const cols = ["No", "param1", "param2"];
        const rows = [["1", "row1", "row2"],["2", "row1", "row2"],["3", "row1", "row2"]];
        const response = await fetch(`${config.baseUrl}/excel`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${loginResponse.access_token}`
            },
            body: JSON.stringify({
                cols: cols,
                rows: rows
            })
        })
        expect(response.ok).toEqual(true);
    })
})
