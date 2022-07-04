
function History({ movesHistory }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>History</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Game Started</td>
                </tr>
                {
                    movesHistory.map((m, mIdx) =>
                        <tr>
                            <td>{mIdx}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default History;