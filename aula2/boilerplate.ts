type Message = {
    id: number;
    message: string;
    date: string;
    likes: number;
};

type User = {
    name: string;
    email: string;
    age: number;
    messages: Message[];
    friends?: Friends[];
};

type Group = {
    name: string;
    email: string;
    age: number;
    messages: Message[];
};

type OuterGroups = {
    id: number;
    name: string;
    groups: Group[];
};

type Friends = {
    id: number;
    person1: User;
    person2: User;
};

const user: User = {
    name: "João",
    email: "",
    age: 0,
    messages: [
        {
            id: 0,
            message: "",
            date: "",
            likes: 0,
        }
    ],
    friends: [
        {
            id: 0,
            person1: {
                name: "",
                email: "",
                age: 0,
                messages: [
                    {
                        id: 0,
                        message: "",
                        date: "",
                        likes: 0,
                    }
                ]
            },
            person2: {
                name: "",
                email: "",
                age: 0,
                messages: [
                    {
                        id: 0,
                        message: "",
                        date: "",
                        likes: 0,
                    }
                ]
            }
        }
    ]
};

const group: Group = {
    name: "",
    email: "",
    age: 0,
    messages: [
        {
            id: 0,
            message: "",
            date: "",
            likes: 0,
        }
    ]
};

const outerGroups: OuterGroups = {
    id: 0,
    name: "",
    groups: [
        {
            name: "",
            email: "",
            age: 0,
            messages: [
                {
                    id: 0,
                    message: "",
                    date: "",
                    likes: 0,
                }
            ]
        }
    ]
};
