var counter = 0;
var currnet_task = undefined;

$(function () {
    $("#newDate").datepicker();
});

// open form (make visable) for adding/editing a task
function openForm() {
    document.getElementById("page-mask").style.display = "block";
    document.getElementById("theForm").style.display = "block";
    document.getElementById("newName").value = "";
    document.getElementById("newDate").value = "";
    document.getElementById("newDesc").value = "";
}

// hide teh form
function closeForm() {
    document.getElementById("theForm").style.display = "none";
    document.getElementById("page-mask").style.display = "none";
}

// creat new task to edit an existing one
// can also call this function to generate tasks 
function submitForm(in1="", in2="", in3="") {
    if (!!currnet_task) {
        // update info of an existing task
        currnet_task.getElementsByClassName("taskName")[0].innerHTML = document.getElementById("newName").value;
        currnet_task.getElementsByClassName("taskDate")[0].innerHTML = document.getElementById("newDate").value;
        currnet_task.getElementsByClassName("taskDesc")[0].innerHTML = document.getElementById("newDesc").value;
        currnet_task = undefined;
        closeForm();
    } else {
        // add a task
        let id = 'id' + counter++;
        let target = 't' + counter;
        // get data from user
        var name = in1 || document.getElementById("newName").value;
        var date = in2 || document.getElementById("newDate").value;
        var desc = in3 || document.getElementById("newDesc").value;

        // task name cannot be empty
        if (name === "") {
            alert("Give your task a title.");
        } else {
            // creat a list item for the new task
            // make the task item draggable and can be swapped
            var task = document.createElement("li");
            task.id = id;
            task.draggable = true;
            task.ondragstart = function (event) {
                event.dataTransfer.setData('target_id', event.target.id);
            }
            task.ondragover = function (event) {
                event.preventDefault();
            }
            task.ondrop = function (event) {
                event.preventDefault();
                var drop_target = event.target;
                var drag_target_id = event.dataTransfer.getData('target_id');
                // allow a task to be placed inside another
                if (drop_target.className === 'taskDesc') {
                    var drag_target = $('#' + drag_target_id)[0];
                    var tmp = document.createElement('span');
                    tmp.className = 'hide';
                    drop_target.after(tmp);
                    tmp.replaceWith(drag_target);
                } else {
                    // make task swap possible
                    while (drop_target.tagName !== 'LI') {
                        console.log(drop_target);
                        drop_target = drop_target.parentNode;
                    }
                    var drag_target = $('#' + drag_target_id)[0];
                    var tmp = document.createElement('span');
                    tmp.className = 'hide';
                    drop_target.before(tmp);
                    drag_target.before(drop_target);
                    tmp.replaceWith(drag_target);
                }
            }

            // create a container for the task label
            var taskLabel = document.createElement("div");
            taskLabel.className = "taskLabel";
            // complete the task by clicking the label
            var taskName = document.createElement("SPAN");
            taskName.appendChild(document.createTextNode(name));
            taskName.className = "taskName";
            taskName.onclick = () => {
                task.classList.toggle("completed");
            }
            var taskDate = document.createElement("SPAN");
            taskDate.appendChild(document.createTextNode(date));
            taskDate.className = "taskDate";
            taskDate.onclick = () => {
                task.classList.toggle("completed");
            }
            // show task detail when click on this icon (...)
            var detBtn = document.createElement("SPAN");
            detBtn.appendChild(document.createTextNode("···"));
            detBtn.className = "detBtn";
            detBtn.onclick = () => {
                $('#' + target).collapse("toggle");
            };
            // remove task when click on this icon (x)
            var delBtn = document.createElement("SPAN");
            delBtn.appendChild(document.createTextNode("✕"));
            delBtn.className = "delBtn";
            delBtn.onclick = () => {
                if (confirm("Delete this item from the list?")) {
                    task.parentNode.removeChild(task);
                }
            }
            // add edit button
            var edtBtn = document.createElement("SPAN");
            edtBtn.appendChild(document.createTextNode("✎"));
            edtBtn.className = "edtBtn";
            edtBtn.onclick = function () {
                openForm();
                // load current task data
                document.getElementById("newName").value = task.getElementsByClassName("taskName")[0].innerHTML;
                document.getElementById("newDate").value = task.getElementsByClassName("taskDate")[0].innerHTML;
                document.getElementById("newDesc").value = task.getElementsByClassName("taskDesc")[0].innerHTML;
                currnet_task = task;
            }
            // build taskLabel (include: task name, date, buttons)
            taskLabel.appendChild(taskName);
            taskLabel.appendChild(taskDate);
            taskLabel.appendChild(delBtn);
            taskLabel.appendChild(edtBtn);
            taskLabel.appendChild(detBtn);

            // create a container for the task detail (collapsible)
            var taskInfo = document.createElement("div");
            taskInfo.classList.add("collapsible", "taskInfo");
            taskInfo.id = target;
            // add task description
            var taskDesc = document.createElement("p");
            taskDesc.appendChild(document.createTextNode(desc));
            taskDesc.className = "taskDesc";
            taskInfo.appendChild(taskDesc);
            // finsih building task
            task.appendChild(taskLabel);
            task.appendChild(taskInfo);
            document.getElementById("theList").appendChild(task);
            $('#' + target).collapse();
            closeForm();
        }
    }
}

// populate the list by calling submitForm()
submitForm("Finish Homework 2", "10/10/2018", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis enim quam in tempore libero fugit nulla tenetur eveniet. Atque vel doloribus iste aut voluptates repellendus dolorum sint illo iure fugit!");
submitForm("Work on Bake-off 2", "10/18/2018", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus perferendis unde iure hic rem labore ex repellat, dolor molestiae quam harum. Voluptatibus, assumenda minus mollitia beatae aliquam eligendi cupiditate nesciunt.");
submitForm("Cook dinner", "10/9/2018", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae non, nostrum beatae hic quod dolorem veniam magnam numquam facere mollitia labore fuga nobis consectetur sit harum quia dolor, odit animi!");
submitForm("Visit family", "10/20/2018", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos laborum mollitia nulla molestias quis esse non id sed sit facilis perspiciatis dicta earum saepe, repudiandae expedita adipisci perferendis. Consequatur, magnam.");
submitForm("Buy apples", "10/10/2018", "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita quam sunt nihil ullam cumque ut deserunt quis in explicabo, molestias eos, illo magni fuga eligendi! Itaque rem culpa ad blanditiis?");
submitForm("Go shopping", "10/13/2018", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos laborum mollitia nulla molestias quis esse non id sed sit facilis perspiciatis dicta earum saepe, repudiandae expedita adipisci perferendis. Consequatur, magnam.");
submitForm("Watch a movie", "10/14/2018", "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita quam sunt nihil ullam cumque ut deserunt quis in explicabo, molestias eos, illo magni fuga eligendi! Itaque rem culpa ad blanditiis?");