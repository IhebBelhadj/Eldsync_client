import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DotInput } from '../models/dot-input';
import { Dot } from '../models/dot';
import { DotSearchInput } from '../models/dot-search-input';

@Injectable({
    providedIn: 'root'
})
export class DotService {

    constructor(private apollo: Apollo) { }

    // Query to get dot by ID
    getDotById(dotId: string, queryString: string): Observable<Dot> {
        const query = gql`
      query GetDotById($dotId: ID!) {
        getDotWithId(dotId: $dotId) {
          ${queryString}
        }
      }
    `;

        return this.apollo
            .query<{ getDotWithId: Dot }>({
                query: query,
                variables: {
                    dotId: dotId,
                },
            })
            .pipe(
                map((result) => result.data.getDotWithId),
                catchError((error) => {
                    console.error('Error fetching dot by ID:', error);
                    throw error;
                })
            );
    }

    searchDots(dotSearchInput: DotSearchInput, queryString: String): Observable<Dot[]> {
        const SEARCH_DOTS_QUERY = gql`
            query SearchDots($dotSearchInput: DotSearchInput) {
            searchDots(dotSearchInput: $dotSearchInput) {
                ${queryString}
            }}`;

        console.log('SEARCH_DOTS_QUERY:', SEARCH_DOTS_QUERY);
        return this.apollo.query<{ searchDots: [Dot] }>({
            query: SEARCH_DOTS_QUERY,
            variables: { dotSearchInput }
        }).pipe(
            map(result => result.data.searchDots),
            catchError(error => {
                console.error('Error searching dots:', error);
                throw error;
            })

        );
    }

    // Mutation to create a new dot
    createDot(dotData: DotInput, queryString: string): Observable<Dot> {
        const mutation = gql`
            mutation CreateDot($dotData: DotInput!) {
                createDot(dotData: $dotData) {
                ${queryString}
                }
            }
            `;

        return this.apollo
            .mutate<{ createDot: Dot }>({
                mutation: mutation,
                variables: {
                    dotData: dotData,
                },
            })
            .pipe(
                map((result) => result.data.createDot),
                catchError((error) => {
                    console.error('Error creating dot:', error);
                    throw error;
                })
            );
    }

    // Mutation to update an existing dot
    updateDot(dotId: string, dotData: DotInput, queryString: string): Observable<Dot> {
        const mutation = gql`
      mutation UpdateDot($dotId: ID!, $dotData: DotInput!) {
        updateDot(dotId: $dotId, dotUpdates: $dotData) {
          ${queryString}
        }
      }
    `;

        return this.apollo
            .mutate<{ updateDot: Dot }>({
                mutation: mutation,
                variables: {
                    dotId: dotId,
                    dotData: dotData,
                },
            })
            .pipe(
                map((result) => result.data.updateDot),
                catchError((error) => {
                    console.error('Error updating dot:', error);
                    throw error;
                })
            );
    }

    // Mutation to delete a dot
    deleteDot(dotId: string): Observable<string> {
        const mutation = gql`
      mutation DeleteDot($dotId: ID!) {
        deleteDot(dotId: $dotId)
      }
    `;

        return this.apollo
            .mutate<{ deleteDot: string }>({
                mutation: mutation,
                variables: {
                    dotId: dotId,
                },
            })
            .pipe(
                map((result) => result.data.deleteDot),
                catchError((error) => {
                    console.error('Error deleting dot:', error);
                    throw error;
                })
            );
    }
}
