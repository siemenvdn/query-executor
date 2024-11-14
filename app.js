function executeQuery() {
    document.getElementById('results').innerHTML = "Executing...";
    const query = document.getElementById('query-input').value;

    if (!query) {
        alert("Please enter a SQL query.");
        return;
    }

    if (!db) {
        alert("Database is not initialized yet.");
        return;
    }

    try {
        const result = db.exec(query);

        const jsonToggle = document.getElementById('json-toggle');

        if (jsonToggle.checked) {
            const formattedResult = formatResultToObject(result);
            const manipulatedResult = manipulate(formattedResult);
            displayJsonResults(manipulatedResult);
        } else {
            displayRawResults(result);
        }
    } catch (error) {
        displayError(error.message);
    }
}

function formatResultToObject(result) {
    if (!result || result.length === 0) {
        return [];
    }

    const columns = result[0].columns;
    const rows = result[0].values;

    return rows.map(row => {
        let obj = {};
        columns.forEach((column, index) => { obj[column] = row[index]; });
        return obj;
    });
}

function displayJsonResults(result) {
    const resultsElement = document.getElementById('results');
    if (result.length === 0) {
        resultsElement.textContent = "No results found.";
        return;
    }

    resultsElement.textContent = JSON.stringify(result, null, 2);
}

function displayRawResults(data) {
    const result = data[0].values;

    const resultsElement = document.getElementById('results');
    if (result.length === 0) {
        resultsElement.textContent = "No results found.";
        return;
    }

    let output = data[0].columns.join(' | ') + "\n";
    for (const row of result) output += row.join(' | ') + "\n";
    resultsElement.textContent = output;
}

function displayError(message) {
    document.getElementById('results').textContent = "Error:\n\n" + message;
}

function toggleManipulatedText() {
    const manipulatedLabel = document.getElementById('manipulated-label');
    const jsonToggle = document.getElementById('json-toggle');
    manipulatedLabel.innerHTML = jsonToggle.checked ? "(manipulated)" : "";
}
