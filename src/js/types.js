/**
 * Shared JSDoc typedefs for the task planner modules.
 *
 * @typedef {"High"|"Medium"|"Low"} TaskPriority
 * @typedef {"Study"|"Work"|"Personal"|"Health"} TaskCategory
 * @typedef {"all"|"active"|"completed"} TaskFilter
 * @typedef {"newest"|"oldest"|"dueDate"|"priority"|"alphabetical"} TaskSort
 * @typedef {{id:string,title:string,category:TaskCategory,priority:TaskPriority,dueDate:string,completed:boolean,createdAt:string}} Task
 * @typedef {{title:string,category:TaskCategory|string,priority:TaskPriority|string,dueDate:string}} TaskPayload
 * @typedef {{id:string,title:string,category:TaskCategory,priority:TaskPriority,dueDate:string}} EditableTaskPayload
 * @typedef {{filter:TaskFilter,query:string,sort:TaskSort}} ViewOptions
 * @typedef {{total:number,active:number,completed:number}} TaskStats
 * @typedef {Record<string, string>} ValidationErrors
 */

export {};
