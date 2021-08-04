import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { IAddResponse, IAnswers, IGroupData, ILoginResponse, IThread, IUserData } from '../scripts/interface';
import { API_URL } from '../scripts/constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient) { }

  addUser = (userData: IUserData): Observable<IAddResponse> => {
    const url = API_URL + "/auth/signup"
    return this.http.post<IAddResponse>(url , userData)
  }

  loginUser = (userData: IUserData): Observable<ILoginResponse> => {
    const url = API_URL + "/auth/login"
    return this.http.post<ILoginResponse>(url , userData)
  }

  getUserData = (): Observable<IUserData> => {
    const url = API_URL + "/user"
    return this.http.get<IUserData>(url)
  }

  getUserGroups = (username: string): Observable<IGroupData[]> => {
    const url = API_URL + `/groups/${username}`
    return this.http.get<IGroupData[]>(url)
  }

  getUserAllGroups = (username: string): Observable<IGroupData[]> => {
    const url = API_URL + `/groups/${username}/all`
    return this.http.get<IGroupData[]>(url)
  }

  addUserGroup = (groupData: IGroupData , username: string): Observable<IGroupData[]> => {
    const url = API_URL + `/groups/${username}/create`
    return this.http.post<IGroupData[]>(url , groupData)
  }

  getGroupInfo = (name: string): Observable<IGroupData> => {
    const url = API_URL + `/groups/info/${name}`
    return this.http.get<IGroupData>(url)
  }

  getAllThreads = (name: string): Observable<IThread[]> => {
    const url = API_URL + `/threads/${name}`
    return this.http.get<IThread[]>(url)
  }
  createThread = (threadData: IThread , group: string): Observable<IThread[]> => {
    const url = API_URL + `/threads/${group}/create`
    console.log(threadData)
    return this.http.post<IThread[]>(url , threadData)
  }

  updateAnswer = (answers: IAnswers[] , threadId: string , group: string): Observable<IAnswers> => {
    const data = {
      answers,
      threadId
    }
    const url = API_URL + `/threads/${group}/update`
    return this.http.post<IAnswers>(url , data)
  }

}
