
import { Request, Response } from "express";
import db from "../modules/db.js";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import {PdfReader} from "pdfreader";
import PdfParse from "pdf-parse";
export default class FileController {
  async createFile(req: Request, res: Response) {
    console.log('req.file', req.file)
    if(req.files) {
      let file = req.files.file as UploadedFile
      console.log('file.name', file.name)
      let fileUTF = Buffer.from(file.name, 'latin1').toString('utf8')
      let secret = new Date().getTime().toString() +'_'+ fileUTF
      let fileName = fileUTF.split('.')[0]
      let filePath = `${path.resolve()}/src/uploads/${secret}`
      console.log()
      file.mv(filePath, async (err: Error) => {
        if(err) {
          res.send(err)
        } else {
          const pdffile = fs.readFileSync(filePath)
          PdfParse(pdffile).then(async data => {
            console.log('data', data)
            const newFile = await db.query('INSERT INTO file (title,secret,pdf_data) values($1, $2, $3) RETURNING *', [fileName,secret,pdffile])
            res.json(newFile.rows[0])
          })
        }
      })
    }
  }
  async getFiles(req:Request, res: Response) {
    const data = await db.query('SELECT * FROM file')
    res.json(data.rows)

  }
  async getFile(req:Request, res: Response) {
    const {secret} = req.params
    let filePath = `${path.resolve()}/src/uploads/${secret}`
    const pdffile = fs.readFileSync(filePath)
    res.send(pdffile)
  }
  async updateFile(req:Request, res: Response) {

  }
  async deleteFile(req:Request, res: Response) {
    
  }
}
