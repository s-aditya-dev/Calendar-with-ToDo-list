//selectors
const calendar = document.getElementById('CalenderDays');
const MonthSelector = document.getElementById('Month-Selector');
const TodayBtn = document.getElementById('today-btn');

const ListContainer = document.getElementById('todo-list-container'); // Assuming you want the first element with this class
const TaskInput = document.getElementById('to-do-input');

//state

let nav = 0;
let navType = false;
let navYear = 0;

let CurrDay = null;
let CurrMonth = null;
let CurrYear = null;

let click = null;

const currDate = new Date()

const Weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let events = localStorage.getItem('ToDoEvents') ? JSON.parse(localStorage.getItem('ToDoEvents')) : {};

const saveEvents = () => localStorage.setItem('ToDoEvents', JSON.stringify(events));

//on mount

ListContainer.innerHTML = '';
TaskInput.value = "";

monthLoad();
initButtons();
load();
loadTodo(CurrDay,Months[CurrMonth],CurrYear);

//handlers



//events
TaskInput.addEventListener("keypress", (event) => { if (event.keyCode === 13) addTask(); });
