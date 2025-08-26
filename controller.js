let data = []

function insertdata(req, res) {
    console.log("[INFO] Entered into Insert Data...")
    let isDuplicate = checkIfDataIsPresent(req.body.rollno)
    if (!isDuplicate) {
        console.log("[INFO] No Duplicate Found")
        data.push(req.body)
        console.log("[SUCCESS] Data Inserted Successfully")
        res.send("Data Inserted");
    }
    else {
        console.log("[INFO] Duplicate Record Found")
        res.send('Record Already exist')
    }
}

function checkIfDataIsPresent(rollno) {
    for (let i of data) {
        if (i.rollno === rollno) {
            return true;
        }
    }
    return false;
}

function getAllStudent(req, res) {
    console.log("[INFO] Entered into Get All Student...")
    res.send(data)
    console.log('[INFO] Successfully Got Detail')
}

function getStudentByRollNo(req, res) {
    console.log("[INFO] Entered into Get Student By Rollno...")
    const rollno = req.body.rollno
    const student = data.find(Student => Student.rollno === rollno)
    if (student) {
        console.log("[SUCCESS] Student Found")
        res.status(200).send(student)
    } else {
        console.log("[Error] Student Not Found")
        res.status(404).send("Student Not Found")
    }
}

function deleteStudent(req, res) {
    console.log('[INFO] Entered into Delete Student....')
    const rollno = req.body.rollno
    let index = data.findIndex(s => s.rollno === rollno)
    if (index !== -1) {
        data.splice(index, 1)
        res.status(200).send("Student Deleted")
    } else {
        res.status(404).send("Student Not Found")
    }
}

function editStudent(req,res){
    console.log('[INFO] Entered into Delete Student....')
    const rollno = req.body.rollno
    let index = data.findIndex(s => s.rollno === rollno)
    if (index !== -1) {
        data[index]=req.body
        res.status(200).send("Student Edited")
    } else {
        res.status(404).send("Student Not Found")
    }
}

module.exports ={ insertdata, getStudentByRollNo, deleteStudent, getAllStudent, editStudent}