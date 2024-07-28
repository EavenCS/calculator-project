const gradeScale = {
    100: 1.0, 99: 1.1, 98: 1.1, 97: 1.2, 96: 1.2, 95: 1.3, 94: 1.3, 93: 1.4, 92: 1.4, 91: 1.5,
    90: 1.6, 89: 1.7, 88: 1.8, 87: 1.9, 86: 2.0, 85: 2.0, 84: 2.1, 83: 2.2, 82: 2.3, 81: 2.4,
    80: 2.5, 79: 2.6, 78: 2.7, 77: 2.7, 76: 2.8, 75: 2.9, 74: 2.9, 73: 3.0, 72: 3.1, 71: 3.1,
    70: 3.2, 69: 3.3, 68: 3.3, 67: 3.4, 66: 3.5, 65: 3.6, 64: 3.6, 63: 3.7, 62: 3.7, 61: 3.8,
    60: 3.9, 59: 3.9, 58: 4.0, 57: 4.0, 56: 4.1, 55: 4.1, 54: 4.2, 53: 4.3, 52: 4.3, 51: 4.4,
    50: 4.4, 49: 4.5, 48: 4.6, 47: 4.6, 46: 4.7, 45: 4.7, 44: 4.8, 43: 4.8, 42: 4.9, 41: 4.9,
    40: 5.0, 39: 5.0, 38: 5.0, 37: 5.1, 36: 5.1, 35: 5.2, 34: 5.2, 33: 5.3, 32: 5.3, 31: 5.4,
    30: 5.4, 29: 5.5, 28: 5.6, 27: 5.6, 26: 5.6, 25: 5.6, 24: 5.6, 23: 5.6, 22: 5.7, 21: 5.7,
    20: 5.7, 19: 5.7, 18: 5.7, 17: 5.7, 16: 5.8, 15: 5.8, 14: 5.8, 13: 5.8, 12: 5.8, 11: 5.9,
    10: 5.9, 9: 5.9, 8: 5.9, 7: 5.9, 6: 5.9, 5: 6.0, 4: 6.0, 3: 6.0, 2: 6.0, 1: 6.0
};

function validateInput(value) {
    return Math.min(Math.max(value, 0), 100);
}

function calculateGrade(points) {
    return gradeScale[Math.round(points)] || 6.0;
}

function calculateExaminationOneGrade() {
    const input = document.getElementById('examinationOne');
    if (!input) {
        console.error("Input field 'examinationOne' not found.");
        return;
    }
    const points = validateInput(parseFloat(input.value));
    input.value = points;
    const grade = calculateGrade(points);
    document.getElementById('notePB1').value = grade.toFixed(1);
    calculateTotalResult();
}

function calculateExaminationTwoGrades() {
    const inputs = ['examinationTwoPB3', 'examinationTwoPB4', 'examinationTwoPB5'];
    const noteOutputs = ['notePB3', 'notePB4', 'notePB5'];
    let totalPoints = 0;

    for (let i = 0; i < inputs.length; i++) {
        const input = document.getElementById(inputs[i]);
        const noteOutput = document.getElementById(noteOutputs[i]);
        if (!input || !noteOutput) {
            console.error(`Input or output field for ${inputs[i]} not found.`);
            continue;
        }
        const points = validateInput(parseFloat(input.value)) || 0;
        input.value = points;
        const grade = calculateGrade(points);
        noteOutput.value = grade.toFixed(1);
        totalPoints += points;
    }

    const averagePoints = totalPoints / 3;
    const totalGrade = calculateGrade(averagePoints);

    document.getElementById('resultPart2').value = averagePoints.toFixed(1);
    document.getElementById('noteResultPart2').value = totalGrade.toFixed(1);
    
    calculateTotalResult();
}

function calculateTotalResult() {
    const pb1Points = parseFloat(document.getElementById('examinationOne').value) || 0;
    const pb2Points = parseFloat(document.getElementById('resultPart2').value) || 0;
    
    // Gewichtung: PB1 (20%), PB2-5 (30%)
    const totalPoints = (pb1Points * 0.2) + (pb2Points * 0.3);
    
    document.getElementById('totalResult').value = totalPoints.toFixed(1);
    
    const useDecimalGrades = document.getElementById('useDecimalGrades').checked;
    let totalGrade;
    
    if (useDecimalGrades) {
        totalGrade = calculateGrade(totalPoints * 10) / 10;
    } else {
        totalGrade = calculateGrade(totalPoints);
    }
    
    document.getElementById('noteTotalResult').value = totalGrade.toFixed(1);
}

function addEventListeners() {
    const inputs = [
        'examinationOne',
        'examinationTwoPB3',
        'examinationTwoPB4',
        'examinationTwoPB5'
    ];

    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', inputId === 'examinationOne' ? calculateExaminationOneGrade : calculateExaminationTwoGrades);
        } else {
            console.error(`Input field '${inputId}' not found.`);
        }
    });

    const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateExaminationTwoGrades);
    } else {
        console.error("Button 'calculateButton' not found.");
    }

    const useDecimalGrades = document.getElementById('useDecimalGrades');
    if (useDecimalGrades) {
        useDecimalGrades.addEventListener('change', calculateTotalResult);
    } else {
        console.error("Checkbox 'useDecimalGrades' not found.");
    }
}

document.addEventListener('DOMContentLoaded', addEventListeners);