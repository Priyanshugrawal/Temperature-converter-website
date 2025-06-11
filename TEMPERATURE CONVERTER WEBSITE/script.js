document.addEventListener('DOMContentLoaded', () => {
    const temperatureInput = document.getElementById('temperature');
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    // Function to convert temperature
    function convertTemperature(temp, fromUnit, toUnit) {
        // First convert to Celsius as base unit
        let celsius;
        switch (fromUnit) {
            case 'celsius':
                celsius = temp;
                break;
            case 'fahrenheit':
                celsius = (temp - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = temp - 273.15;
                break;
        }

        // Then convert from Celsius to target unit
        let result;
        switch (toUnit) {
            case 'celsius':
                result = celsius;
                break;
            case 'fahrenheit':
                result = (celsius * 9/5) + 32;
                break;
            case 'kelvin':
                result = celsius + 273.15;
                break;
        }

        return result;
    }

    // Function to format the result
    function formatResult(value, unit) {
        return `${value.toFixed(2)}°${unit.charAt(0).toUpperCase()}`;
    }

    // Function to validate input
    function validateInput() {
        const temp = temperatureInput.value;
        if (temp === '') {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Please enter a temperature</p>';
            return false;
        }
        if (isNaN(temp)) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Please enter a valid number</p>';
            return false;
        }
        return true;
    }

    // Event listener for convert button
    convertBtn.addEventListener('click', () => {
        if (!validateInput()) return;

        const temp = parseFloat(temperatureInput.value);
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;

        // Don't convert if same units are selected
        if (fromUnit === toUnit) {
            resultDiv.innerHTML = `<p>${formatResult(temp, fromUnit)}</p>`;
            return;
        }

        const convertedTemp = convertTemperature(temp, fromUnit, toUnit);
        resultDiv.innerHTML = `<p>${formatResult(convertedTemp, toUnit)}</p>`;
    });

    // Event listener for Enter key
    temperatureInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertBtn.click();
        }
    });
}); 