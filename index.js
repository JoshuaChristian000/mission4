function submit() {
    let name = document.getElementById("name");
    let date = document.getElementById("date");
    let task = document.getElementById("task");
    let urgency = document.getElementById("urgency");

    let nameValue = name.value;
    let dateValue = date.value;
    let taskValue = task.value;
    let urgencyValue = urgency.value;

    // console.log(nameValue);
    
    const todo = {
        name: nameValue, 
        date: dateValue, 
        task: taskValue,
        urgency: urgencyValue,
        id: 'id' + (new Date()).getTime(),
        done: false
    };

    console.log(todo);

    if(!nameValue|| !dateValue || !taskValue || !urgencyValue){
        alert("Tolong Input semua ya");
        return;
    }
    
    
    let list;

    if (localStorage.getItem('list')===null)
		{
			list = [];
		}
		else
		{
			list = JSON.parse(localStorage.getItem('list'));	
		}
		
		list.push(todo);	
		localStorage.setItem('list',JSON.stringify(list));
		
      
        
        alert("Berhasil disimpan");
        
        name.value = "";
        date.value = "";
        task.value = "";
        urgency.selectedIndex = 0;

        show();
        
}

function show() {
    let list = JSON.parse(localStorage.getItem("list")) || []; 
    let todolist = document.getElementById("todolist");
    let donelist = document.getElementById("donelist");

    todolist.innerHTML = ""; 
    donelist.innerHTML = "";

    let today = new Date().toISOString().split("T")[0]; 


    list.forEach((todo) => {
        let isOverdue = new Date(todo.date) < new Date(today); 
        let overdueBadge = isOverdue
            ? `<div class="badge badge-error">Overdue</div>`
            : ""; 

        let urgencyBadgeClass = todo.urgency === "Low" ? "badge-success" :
            todo.urgency === "Medium" ? "badge-warning":
            "badge-error";

        let card = document.createElement("div");
        card.className = "card bg-base-100 card-compact shadow-xl";
        card.innerHTML = `
            <div class="card-body">
                <div class="flex flex-wrap justify-between items-center gap-2">
                    <input type="checkbox" class="checkbox" onclick="done('${todo.id}')" ${todo.done ? 'checked' : ''} />
                    <div class="flex-1 text-start">
                        <p style="text-decoration: ${todo.done ? 'line-through' : ''};">${todo.task}</p>
                        <p style="text-decoration: ${todo.done ? 'line-through' : ''};">${todo.name}</p>
                        <p style="text-decoration: ${todo.done ? 'line-through' : ''};">${todo.date}</p>
                    </div>
                    <div class="flex-1 flex-wrap">
                        <div class="badge ${urgencyBadgeClass}">${todo.urgency}</div>
                        ${overdueBadge}
                    </div>
                    <div class="justify-end card-actions">
                        <button class="btn btn-info btn-sm" onclick="todoDelete('${todo.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
        if(todo.done){
            donelist.appendChild(card);    
        } else{
            todolist.appendChild(card);
        }
    });
}

// Jalankan `show()` saat halaman dimuat
document.addEventListener("DOMContentLoaded", show);

function done(id){
    let list = JSON.parse(localStorage.getItem("list")) || [];
 
    const todoIndex = list.findIndex(todo => todo.id === id);

    if(todoIndex !== -1){
        list[todoIndex].done = !list[todoIndex].done;

        localStorage.setItem("list", JSON.stringify(list));

        show();
    }


}


function todoDelete(id){
    if (!confirm("Apa anda yakin?")) {
        return;
      }
        let list = JSON.parse(localStorage.getItem("list")) || [];

        const todo = list.filter((task) => task.id !== id);
        localStorage.setItem("list", JSON.stringify(todo));

        show();
}