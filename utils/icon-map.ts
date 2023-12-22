export const statusIconLightThemeMap: {[status in string]: string} = {
    'todo': 'todo',
    'in progress': 'in-progress',
    'backlog': 'backlog',
    'done': 'done',
    'cancelled': 'cancelled'
};

export const statusIconDarkThemeMap: {[status in string]: string} = {
    'todo': 'todo-dark',
    'in progress': 'in-progress',
    'backlog': 'backlog-dark',
    'done': 'done',
    'cancelled': 'cancelled'
};

export const priorityIconLightThemeMap: {[priority in string]: string} = {
    '4': 'urgent-priority',
    '3': 'high-priority',
    '2': 'medium-priority',
    '1': 'low-priority',
    '0': 'no-priority'
};

export const priorityIconDarkThemeMap: {[priority in string]: string} = {
    '4': 'urgent-priority-dark',
    '3': 'high-priority-dark',
    '2': 'medium-priority-dark',
    '1': 'low-priority-dark',
    '0': 'no-priority-dark'
};