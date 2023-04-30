import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TaskStateType = {
    [todoListID: string]: TaskType[]
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].filter(t => t.id !== id);
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updateTasks = [newTask, ...tasks[todoListID]]
        setTasks({...tasks, [todoListID]: updateTasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        const updateTasks = tasks[todoListID].map(tl => tl.id === taskId
            ? {...tl, isDone: isDone}
            : tl)

        setTasks({...tasks, [todoListID]: updateTasks});
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, filter: value}
            : tl
        ))
    }

    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const todoListComponents: JSX.Element[] = todoLists.map(tl => {
        const tasksWhatIWantToSee = getTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Todolist todoListID={tl.id}
                      title={tl.title}
                      tasks={tasksWhatIWantToSee}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={tl.filter}
            />
        )
    })


    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
