function addStudent() {
        //take data from web according the id of input
        //trim prevent space
        let names = document.getElementById("name").value.trim();
        let scores = document.getElementById("score").value;
        if (names === "" || scores === ""){
            showmessage("Please fill in all field!","red");
            return;
        }
        scores = Number(scores);
        if (isNaN(scores)){
            showmessage("Please fill in number.","red")
            return
        }
        //从storage读取students数据，若没数据就读取到空的数组
        let students = JSON.parse(localStorage.getItem("students")) || [];
        //添加学生，然后数据是后面写的
        students.push({ name: names, score: scores });
        //将添加的students存入localStorage,而且名字是students
        localStorage.setItem("students",JSON.stringify(students));
        showmessage("Add student completely!","green")
        display_student();

        document.getElementById("name").value = "";
        document.getElementById("score").value = "";
    }
function display_student(){
    //前面的list就可以等于后面标记的叫"list"的位置
    let list = document.getElementById("list");
    let students = JSON.parse(localStorage.getItem("students")) || [];
    //可以避免重复显示一样的，每次显示前先删掉再显示完
    list.innerHTML = ""

    //student是暂时variable,遍历,判断和输出
    for(let i = 0; i < students.length;i++){
        let student = students[i];
        let result = is_pass(student.score) ? "Pass" : "Fail";
        let grade = get_grade(student.score);
        list.innerHTML += `
        <p>
        ${student.name} - ${student.score} - ${result} - ${grade}
        <button onclick="delete_student(${i})">delete</button>
        <button onclick="edit_student(${i})">edit</button>
        </p>`;
    }
}
function is_pass(score){
    return score >= 50;
}
function get_grade(score){
    if (score >= 80){
        return "A";
    }else if (score >= 60){
        return "B";
    }else {
        return "C";
    }
}
function delete_student(index){
    let students = JSON.parse(localStorage.getItem("students")) || [];
    //delete (one/...) elements according index
    students.splice(index,1);
    localStorage.setItem("students",JSON.stringify(students));
    display_student()
}
function edit_student(index){
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let new_score = prompt("Enter the new score: ")
    if (new_score === null)return;
    new_score = Number(new_score)
    if (isNaN(new_score)){
        showmessage("Please enter a number!","red");
        return;
    }
    students[index].score = new_score;
    localStorage.setItem("students",JSON.stringify(students));
    display_student();
}
function showmessage(text,color){
    let msg = document.getElementById("message");
    msg.innerHTML = text;
    msg.style.color = color;
}
function search_student(){
    let search_name = document.getElementById("search").value.toLowerCase();
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let list = document.getElementById("list");
    list.innerHTML = "";

    for (let student of students){
        if (student.name.toLowerCase().includes(search_name)){
            let result = is_pass(student.score) ? "Pass" : "Fail";
            let grade = get_grade(student.score);
            list.innerHTML += `
            <p>
            ${student.name} - ${student.score} - ${result} - ${grade}
            </p>`;
        }
    }
    if (list.innerHTML === ""){
        showmessage("Name not found!","red")
    }
}
display_student();