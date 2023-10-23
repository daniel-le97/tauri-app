


import { db } from "./index.js";
import { type TemplateDTO, type Template, type Note, NoteDTO, type Common } from "./types.js";
import { defu } from 'defu'
// import * as dialog from '@tauri-apps/api/dialog'
// import { useDB } from "./index.js";

class DBService {
    notes = {
        async getAll(){
            return await db.select<NoteDTO[]>(`SELECT * FROM notes`)
        },
        async getById(id: string | number){
            const note = (await db.select<NoteDTO[]>(`SELECT * FROM notes where id = $1`, [id]))[0]
            if (!note) {
                console.error('[DB:note:getById] Error: there was a problem finding id ' + id);
            }
            return note
        },
        async deleteById(id: string) {
            const note = await this.getById(id)
            return await db.execute(`DELETE FROM notes where id = $1`, [note.id])
        },
        async create(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
            const { asset, description, email, phone } = note
            const newNote = (await db.execute("INSERT into notes (asset, description, email, phone) VALUES ($1, $2, $3, $4)", [asset,description,email,phone]))
            return this.getById(newNote.lastInsertId)
        },
        async getCurrent(){
            return (await db.select<NoteDTO[]>(`SELECT * from notes where current = 1`))[0]
        },
        async update(note: NoteDTO){
            const updated = await db.execute(`update 
            notes 
          set 
            description = $2,
            phone = $3,
            asset = $4,
            email = $5,
            current = $6
          where 
            id = $1;`, [note.id, note.description, note.phone, note.asset, note.email, note.current])
            if (updated.rowsAffected !== 1) {
                console.error('[DB:note:update] Error: there was a problem updating the note id ' + note.id )
            }
            return updated
            
        }
    }
    templates = {
        async getAll(){
            return await db.select<TemplateDTO[]>(`SELECT * FROM templates`)
        },
        async getById(id: string | number){
            return await db.select<TemplateDTO>(`SELECT * FROM template where id = $1`, [id])
        },
        async deleteById(id: number) {
          
            
            return await db.execute(`DELETE FROM templates where id = $1`, [id])
        },
        async update(template: TemplateDTO){
            const foundChecklist = await this.getById(template.id)
            return await db.execute(
           `UPDATE 
            template 
          SET 
            title = $2,
            content = $3,
            template = $4
          WHERE 
            id = $1;`, [])
        },
        async create(template: Omit<Template, 'id' | 'created_at' | 'updated_at'>) {
            let { title, content, tag } = template
          
            const response =  (await db.execute("INSERT into templates (title, content, tag) VALUES ($1, $2, $3)", [title, content, tag]))
            if (response.rowsAffected === 0) {
            //   dialog.message("there was an issue creating the template please submit again")
            }
            return response
        },
        
    }
}


export const dbService = new DBService()

