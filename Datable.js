    window.addEventListener("load",function(){

        let Posts;
        let postsInJson;
            (async function getPosts(){
        Posts = await fetch("https://jsonplaceholder.typicode.com/posts");
        postsInJson = await Posts.json();
        // console.log(postsInJson);

        localStorage.setItem("DataTable",JSON.stringify(postsInJson));
            })();
            
        let Datatbl =JSON.parse(localStorage.getItem("DataTable"));

        let tbody = document.getElementById("body");
        let Searchid = document.querySelector(".Searchid");
        let searchTitle = document.querySelector(".Searchtitle");
        let srtid =document.querySelector(".id");
        let usrId = document.querySelector(".userid");

        tbody.innerHTML='';
        Datatbl.slice(0,10).forEach((data)=> {
        tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                            <td>${data.title}</td><td>${data.body}</td>
                            <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
        });
        
        // paggination of data
        let nextpg =document.querySelector(".next");
        let itemsPerPage = 10;
        let currentPage =1;
        nextpg.addEventListener("click" , function(){
            if(currentPage<10){  // to make event only happen in range (0,10)
            tbody.innerHTML="";
            let startIndex = (currentPage) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            let currentItems = Datatbl.slice(startIndex,endIndex);

            currentPage++;
            if(currentPage > (Datatbl.length/itemsPerPage)){
                currentItems = Datatbl.slice(90,100);
            }
            currentItems.forEach((data) => {
                tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
            })
        }
        });
            // previous page event
            let previouspg = document.querySelector(".Previous");
            previouspg.addEventListener("click",function(){
                if(currentPage > 1){  // to make event dont happen when not clicked on next page 
                tbody.innerHTML="";
                currentPage--;

                let startIndexPrv =(currentPage -1) * itemsPerPage;
                let endIndexPrv = startIndexPrv + itemsPerPage;
                let currentItemsPrv = Datatbl.slice(startIndexPrv,endIndexPrv);
                if(currentPage <= 0){
                    currentItemsPrv = Datatbl.slice(0,10);
                }
                currentItemsPrv.forEach((data) => {
                    tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
                })
            }
            });


        //DropDown menu
        // Get the button and menu
        let btn = document.getElementById("dropdownMenuButton");
        let menu = document.querySelector(".dropdown-menu");

        // Toggle menu visibility when the button is clicked
        btn.addEventListener("click", function() {
        menu.classList.toggle("show");
        });

        // Hide menu if clicked outside of it
        window.onclick = function(event) {
        if (!event.target.matches('.dropdown-toggle')) {
            let dropdowns = document.getElementsByClassName("dropdown-menu");
            for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
            }
        }
    }
};

        //showing only 10 elements
        let _10pgs=document.querySelector(".dropPg1");
        
        _10pgs.addEventListener("click",function(){
            tbody.innerHTML="";
            Datatbl.slice(0,10).forEach((data) => {
                tbody.innerHTML +=  `<tr><td>${data.id}</td><td>${data.userId}</td>
                <td>${data.title}</td><td>${data.body}</td>
                <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
            });
        });

          //showing only 25 elements
        let _25pgs=document.querySelector(".dropPg2");
        
        _25pgs.addEventListener("click",function(){
            tbody.innerHTML="";
            Datatbl.slice(0,25).forEach((data) => {
                tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                <td>${data.title}</td><td>${data.body}</td>
                <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
            });
        });

        //showing only 50 elements
        let _50pgs=document.querySelector(".dropPg3");
        
        _50pgs.addEventListener("click",function(){
            tbody.innerHTML="";
            Datatbl.slice(0,50).forEach((data) => {
                tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
                });
            });

        //showing 100 elements
        let _100pgs=document.querySelector(".dropPg4");
        
        _100pgs.addEventListener("click",function(){
            tbody.innerHTML="";
            Datatbl.forEach((data) => {
                tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
                });
            });

        // search with ID
        Searchid.addEventListener('keyup',function(){
            tbody.innerHTML='';
            if(!Searchid.value || Searchid.value == 0 ) {
                Datatbl.slice(0,10).forEach((data)=> {
                    tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
                });
            }
            for (let i = 0; i < Datatbl.length; i++) {
                if (Datatbl[i].id == Searchid.value)
                {tbody.innerHTML += `<tr><td>${Datatbl[i].id}</td><td>${Datatbl[i].userId}</td>
                    <td>${Datatbl[i].title}</td><td>${Datatbl[i].body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;}
            }
        });

        // search with title
        searchTitle.addEventListener('keyup',function(){
            //console.log("clicked");
            tbody.innerHTML="";
            if(!searchTitle.value){
                Datatbl.slice(0,10).forEach((data)=> {
                    tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
                });
            }
            //if(searchTitle.value == ''){console.error("no data exists");}
            for (let i = 0; i < Datatbl.length; i++) {   
                if(Datatbl[i].title.split(" ").some(str => str.includes(searchTitle.value.trim()))){ 
                    //console.log(i); split to arr [a,b,x] and "some" is check if value includes in any of array indices
                {tbody.innerHTML += `<tr><td>${Datatbl[i].id}</td><td>${Datatbl[i].userId}</td>
                    <td>${Datatbl[i].title}</td><td>${Datatbl[i].body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;}
                }
            }
        });

        // sort According to ID
        srtid.addEventListener('click',function(){
            tbody.innerHTML='';
            Datatbl.sort(function (a,b) {return b.id-a.id}).forEach((data) => {
                tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
            })
        });

        // sort according to userId
        usrId.addEventListener('click',function(){
            tbody.innerHTML='';
            Datatbl.sort(function (a,b) {return b.userId-a.userId}).forEach((data) => {
                tbody.innerHTML += `<tr><td>${data.id}</td><td>${data.userId}</td>
                    <td>${data.title}</td><td>${data.body}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td></tr>`;
            })
        });

            // delete a row of data
            let dlt = document.querySelectorAll(".delete");
            dlt.forEach((btn) => {
            btn.addEventListener('click',function(){
                this.parentElement.parentElement.remove();
            });
        });

});