// Theme switching functions
function switchTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('themeSelector').value = savedTheme;
}

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', initTheme);

let arbitEHRMap = {};
let mappings = [];
let currentIndex = -1;

function loadArbitEHRMappings() {
    const arbitNumbers = document.getElementById('arbitInputArea').value.split('\n').map(s => s.trim()).filter(s => s !== '');
    const ehrNumbers = document.getElementById('ehrInputArea').value.split('\n').map(s => s.trim()).filter(s => s !== '');
    const feedback = document.getElementById('mappingFeedback');

    if (arbitNumbers.length === 0 || ehrNumbers.length === 0) {
      feedback.textContent = 'Please enter both ARBIT numbers and EHRs.';
      feedback.style.color = '#dc2626';
      return;
    }
    if (arbitNumbers.length !== ehrNumbers.length) {
      feedback.textContent = 'Error: Number of ARBITs and EHRs do not match.';
      feedback.style.color = '#dc2626';
      return;
    }

    arbitEHRMap = {};
    mappings = [];
    for (let i = 0; i < arbitNumbers.length; i++) {
      arbitEHRMap[arbitNumbers[i]] = ehrNumbers[i];
      mappings.push({arbit: arbitNumbers[i], ehr: ehrNumbers[i]});
    }
    currentIndex = 0;
    updateCurrentMapping();
    feedback.textContent = `Successfully loaded ${arbitNumbers.length} data entries.`;
    feedback.style.color = '#16a34a';
    document.getElementById('prevBtn').disabled = false;
    document.getElementById('nextBtn').disabled = false;
}

function updateCurrentMapping() {
    if (mappings.length > 0 && currentIndex >= 0 && currentIndex < mappings.length) {
        document.getElementById('currentSelection').textContent = `Data ${currentIndex + 1} of ${mappings.length}: ARBIT ${mappings[currentIndex].arbit} - EHR ${mappings[currentIndex].ehr}`;
        generate();
    }
}

function previousMapping() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCurrentMapping();
    }
}

function nextMapping() {
    if (currentIndex < mappings.length - 1) {
        currentIndex++;
        updateCurrentMapping();
    }
}

function autoFormatDate(element) {
    let value = element.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
        value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    
    // Limit to mm/dd/yyyy format
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    element.value = value;
}

function setText(id, value){
    let el = document.getElementById(id);
    el.innerText = value;
    el.title = value; //  this adds the hover tooltip
}

function generate(){

if (mappings.length > 0 && currentIndex >= 0 && currentIndex < mappings.length) {
    let dispute = mappings[currentIndex].arbit;
    let ehr = mappings[currentIndex].ehr;

    setText("hcfa", dispute+"_"+ehr+"_HCFA");
    setText("eob", dispute+"_"+ehr+"_PHYSICALEOB");
    setText("hmo", dispute+"_"+ehr+"_INSURANCECARD");
    setText("op", dispute+"_"+ehr+"_OPREPORT");
    setText("op2", dispute+"_"+ehr+"_OPREPORT2");
    setText("op3", dispute+"_"+ehr+"_OPREPORT3");
} else {
    // Clear outputs if no mappings
    setText("hcfa", "");
    setText("eob", "");
    setText("hmo", "");
    setText("op", "");
    setText("op2", "");
    setText("op3", "");
}

}

function copyText(id){

let text =
document.getElementById(id).innerText;

navigator.clipboard.writeText(text);

//alert("Copied: "+text);

}

function clearFields(){
    if (!confirm("Are you sure you want to clear all data? This action cannot be undone. Bahala ka!")) {
        return;
    }

mappings = [];
arbitEHRMap = {};
currentIndex = -1;

document.getElementById('arbitInputArea').value = '';
document.getElementById('ehrInputArea').value = '';
document.getElementById('mappingFeedback').textContent = '';
document.getElementById('currentSelection').textContent = 'No data loaded';
document.getElementById('prevBtn').disabled = true;
document.getElementById('nextBtn').disabled = true;

document.getElementById("hcfa").innerText="";
document.getElementById("eob").innerText="";
document.getElementById("hmo").innerText="";
document.getElementById("op").innerText="";
document.getElementById("op2").innerText="";
document.getElementById("op3").innerText="";

clearCaseNotes();
clearMissingNotes();

}

function validateDateFormat(dateStr) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    return regex.test(dateStr);
}

function generateCaseNotes() {
    const frDateCheckbox = document.getElementById("frDateCheckbox").checked;
    const lastEobCheckbox = document.getElementById("lastEobCheckbox").checked;
    const claimCheckbox = document.getElementById("claimCheckbox").checked;
    
    const frDateSystem = document.getElementById("frDateSystem").value.trim();
    const frDateCorrect = document.getElementById("frDateCorrect").value.trim();
    const lastEobSystem = document.getElementById("lastEobSystem").value.trim();
    const lastEobCorrect = document.getElementById("lastEobCorrect").value.trim();
    const claimSystem = document.getElementById("claimSystem").value.trim();
    const claimUser = document.getElementById("claimUser").value.trim();
    
    let output = "";
    let outputs = [];
    
    // FR Date logic: Check if only Correct date is filled (Added) or both are filled (Updated)
    if (frDateCheckbox && frDateCorrect && !frDateSystem) {
        // Only Correct date is filled - Added message
        outputs.push(`Added the FR Date (${frDateCorrect}).`);
    } else if (frDateCheckbox && frDateSystem && frDateCorrect && validateDateFormat(frDateSystem) && validateDateFormat(frDateCorrect)) {
        // Both dates are filled - Updated message
        outputs.push(`Updated the FR Date from ${frDateSystem} to ${frDateCorrect}.`);
    }
    
    // Last EOB logic: Check if only Correct date is filled (Added) or both are filled (Updated)
    if (lastEobCheckbox && lastEobCorrect && !lastEobSystem) {
        // Only Correct date is filled - Added message
        outputs.push(`Added the Last EOB (${lastEobCorrect}).`);
    } else if (lastEobCheckbox && lastEobSystem && lastEobCorrect && validateDateFormat(lastEobSystem) && validateDateFormat(lastEobCorrect)) {
        // Both dates are filled - Updated message
        outputs.push(`Updated the Last EOB from ${lastEobSystem} to ${lastEobCorrect}.`);
    }
    
    // Check if both FR Date and Last EOB are in "Added" state
    const frIsAdded = frDateCheckbox && frDateCorrect && !frDateSystem;
    const lastEobIsAdded = lastEobCheckbox && lastEobCorrect && !lastEobSystem;
    
    if (frIsAdded && lastEobIsAdded) {
        // Both are Added - replace individual messages with combined message
        outputs = [];
        outputs.push(`Added the FR Date and Last EOB (${frDateCorrect}).`);
    }
    
    // Check if both FR Date and Last EOB are in "Updated" state
    const frIsUpdated = frDateCheckbox && frDateSystem && frDateCorrect && validateDateFormat(frDateSystem) && validateDateFormat(frDateCorrect);
    const lastEobIsUpdated = lastEobCheckbox && lastEobSystem && lastEobCorrect && validateDateFormat(lastEobSystem) && validateDateFormat(lastEobCorrect);
    
    if (frIsUpdated && lastEobIsUpdated) {
        // Both are Updated - replace individual messages with combined message
        outputs = [];
        outputs.push(`Updated the FR Date and Last EOB from ${frDateSystem} to ${lastEobCorrect}.`);
    }
    
    // Check Claim Number (either Added or Updated based on completion)
    if (claimCheckbox && claimUser && !claimSystem) {
        // Only correct data is filled - Added message
        outputs.push(`Added Claim Number (${claimUser}).`);
    } else if (claimCheckbox && claimSystem && claimUser) {
        // Both are filled - Updated message
        outputs.push(`Updated the Claim Number from ${claimSystem} to ${claimUser}.`);
    }
    
    // Combine outputs
    if (outputs.length > 0) {
        output = outputs.join(" ");
    }
    
    setText("caseOutput", output);
}

function clearCaseNotes() {
    document.getElementById("frDateCheckbox").checked = false;
    document.getElementById("lastEobCheckbox").checked = false;
    document.getElementById("claimCheckbox").checked = false;
    
    document.getElementById("frDateSystem").value = "";
    document.getElementById("frDateCorrect").value = "";
    document.getElementById("lastEobSystem").value = "";
    document.getElementById("lastEobCorrect").value = "";
    document.getElementById("claimSystem").value = "";
    document.getElementById("claimUser").value = "";
    
    document.getElementById("caseOutput").innerText = "";
}

function generateMissingNotes() {
    const mrNote = document.getElementById("mrNoteCheckbox").checked;
    const hcfaNote = document.getElementById("hcfaNoteCheckbox").checked;
    const eobNote = document.getElementById("eobNoteCheckbox").checked;
    const insCard = document.getElementById("insCardCheckbox").checked;
    const checkEob = document.getElementById("checkEobCheckbox").checked;
    
    // Manage the main notes output (MR, HCFA, EOB combinations)
    let mainOutput = "";
    const checkedCount = (mrNote ? 1 : 0) + (hcfaNote ? 1 : 0) + (eobNote ? 1 : 0);
    
    if (checkedCount > 0) {
        let items = [];
        if (eobNote) items.push("EOB");
        if (hcfaNote) items.push("HCFA");
        if (mrNote) items.push("MR");
        
        let portal = "";
        if (eobNote && !hcfaNote && !mrNote) {
            portal = "USMon portal/RCM/Availity";
        } else if ((mrNote || hcfaNote) && !eobNote) {
            portal = "USMon portal";
        } else if (eobNote && hcfaNote && mrNote) {
            portal = "USMon portal/RCM/Availity";
        } else if (eobNote && mrNote && !hcfaNote) {
            portal = "USMon portal/RCM/Availity";
        } else if (eobNote && hcfaNote && !mrNote) {
            portal = "USMon portal/Availity";
        } else if (hcfaNote && mrNote && !eobNote) {
            portal = "USMon portal";
        }
        
        mainOutput = `Failure: Unable to locate ${items.join("/")} in ${portal}, Doc Mngmt will need to escalate to customer/IDR2RCM if no physical documents.`;
    }
    
    setText("missingOutput", mainOutput);
    
    // INS Card output
    let insCardOutput = "";
    if (insCard) {
        insCardOutput = "Failure: Unable to locate insurance card in USMon portal.";
    }
    setText("insCardOutput", insCardOutput);
    
    // Check/Production Date EOB output
    let checkEobOutput = "";
    if (checkEob) {
        checkEobOutput = "Failure: There's no physical EOB available in the Phicure portal and no 835 uploaded. A physical EOB was uploaded via Availity, but there's no check date available.";
    }
    setText("checkEobOutput", checkEobOutput);
}

function clearMissingNotes() {
    document.getElementById("mrNoteCheckbox").checked = false;
    document.getElementById("hcfaNoteCheckbox").checked = false;
    document.getElementById("eobNoteCheckbox").checked = false;
    document.getElementById("insCardCheckbox").checked = false;
    document.getElementById("checkEobCheckbox").checked = false;
    
    document.getElementById("missingOutput").innerText = "";
    document.getElementById("insCardOutput").innerText = "";
    document.getElementById("checkEobOutput").innerText = "";
}