const inspectionList = [];

function addInspection() {
    const item = document.getElementById('item').value.trim();
    const status = document.getElementById('status').value;
    const comments = document.getElementById('comments').value.trim();

    if (!item) {
        alert("Please enter an inspection item.");
        return;
    }

    const inspection = { item, status, comments };
    inspectionList.push(inspection);

    renderInspections();
    clearForm();
}

function renderInspections() {
    const list = document.getElementById('inspection-list');
    list.innerHTML = '';

    inspectionList.forEach((insp, index) => {
        const div = document.createElement('div');
        div.className = `inspection-item ${insp.status.toLowerCase()}`;
        div.innerHTML = `<strong>${insp.item}</strong> - ${insp.status}
                         ${insp.comments ? `<br>Comments: ${insp.comments}` : ''}
                         <br><button onclick="deleteInspection(${index})">Delete</button>`;
        list.appendChild(div);
    });
}

function deleteInspection(index) {
    inspectionList.splice(index, 1);
    renderInspections();
}

function clearForm() {
    document.getElementById('item').value = '';
    document.getElementById('comments').value = '';
}

function downloadReport() {
    let report = "Construction Inspection Report\n\n";
    inspectionList.forEach(insp => {
        report += `${insp.item} - ${insp.status}\n`;
        if (insp.comments) report += `Comments: ${insp.comments}\n`;
        report += '\n';
    });

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "inspection_report.txt";
    link.click();
}
