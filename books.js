/*
Author: Carl Angelo P. Nievarez
Subject: XML and Web Services Programming
Assignment: 2
Description: For XML Intro
Created: 9/20/2020 13:06
*/

document.addEventListener('DOMContentLoaded',()=>{
    let url = "books.xml" 
    
    fetch(url)
    .then (response=>response.text())
    .then (data=>{
        let parser = new DOMParser();
        let xml = parser.parseFromString(data,"application/xml");

        displayBookCategoryList(xml);
        displayBooksList(xml);
    });
})

function displayBookCategoryList(x){
    let bookcategory = x.getElementsByTagName('book');
    let book=[];
    for(let i=0; i<bookcategory.length; i++){
        i1 = bookcategory[i].getAttribute('category');
        book.push(i1); //create array    
    }
    //console.log(book);
    let li = document.createElement('li');
    //filter duplicates
    book.filter((item,index) => book.indexOf(item) === index);
    bookcatfiltered = book.reduce((unique,item) =>unique.includes(item) ? unique : [...unique, item],[]);
    //console.log(bookfiltered);    
    //end of filter duplicates

    let str = '<div class="category">'
    bookcatfiltered.forEach(function(newbookcategory) {
        str += '<a class="btn '+ newbookcategory +'" onclick="filterBookby(\''+ newbookcategory +'\');">'+ newbookcategory + '</a>';
    }); 
    str += '</div>';
    document.getElementById("demo1").innerHTML = str;
}

function filterBookby(x) {
    //filter code here
    console.log('filter by '+x);
}

function displayBooksList(x){
    let book = x.getElementsByTagName('book');
    let pesorate =50.55; //sample rate
    let str = '';
    for(let i=0; i<book.length; i++){
        let bookTitle = book[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        let author = book[i].getElementsByTagName("author");
        let publish = book[i].getElementsByTagName("year")[0].childNodes[0].nodeValue;
        let price = book[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
        let bookcategory = book[i].getAttribute('category');
        
        //getting authors
        amountOfAuthor = author.length;         
        authors='';
        for (let j = 0; j < amountOfAuthor; j++) {            
            authors+=book[i].getElementsByTagName("author")[j].childNodes[0].nodeValue;
        } 

        //getting languages
        let lang='';
        bookTitlev2 = book[i].getElementsByTagName("title");
        for (let k = 0; k < bookTitlev2.length; k++) {            
            lang+=bookTitlev2[k].getAttribute('lang');
        } 
               
        //exchange dollar to peso
        currentprice=(price*pesorate).toFixed(2);
        //exchange dollar to peso
        
        //display each value
        str += '<div class="thebooks thebooks'+ bookcategory +'" data-id="thebooks'+ bookcategory +'" >';
        str += '<h1>'+ bookTitle + '</h1>';
        str += '<p><i>Category: </i>'+ bookcategory + ' <i>Language: </i>'+ lang + '</p>';
        str += '<p>by <b>'+ authors + '</b></p>';
        str += '<p><i>Published: </i>'+ publish + '</p>';
        str += '<p>Price: <b>&#8369;'+ currentprice+ '</b></p>';  
        str += '<p><a href="http://google.com/search?q=Purchase '+ bookTitle +' by '+ authors +'"  type="button">Buy Now</a></p>';  
        str += '</div>';
    }

    document.getElementById("demo2").innerHTML = str;
}