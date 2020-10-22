import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

/*
 This component establishes what data can be used.
 */
export const FollowerProvider = (props) => {
    const [followers, setFollowers] = useState([])
    const userId = sessionStorage.getItem("active_user")

    //gets all friend relationships where friendUserId is the current logged in user
    //userId in the returned objects is expanded to show the friend(user)'s info
    const getFollowers = () => {
        return fetch(`http://localhost:8088/followers?followerAddedId=${userId}&_expand=user`)
            .then(res => res.json())
            .then(setFollowers)
    }

    
    const addFollower = followerObj => {
        return fetch("http://localhost:8088/followers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followerObj)
        })
            .then(getFollowers)
    }

    //will be used for viewing friend details and deleting friend relationships
    const getFollowerById = (id) => {
        return fetch(`http://localhost:8088/followers?followerAddedId=${userId}&userId=${id}&_expand=user`)
            .then(res => res.json())
    }

    const getReptiles = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
    }

    const getAlternateRelationship = (followerId) => {
        return fetch(`http://localhost:8088/followers?followerAddedId=${followerId}&userId=${userId}`)
        .then(res => res.json())
    }

    return (
        <FollowerContext.Provider value={{
            followers, getFollowers, addFollower, getFollowerById, getReptiles, getAlternateRelationship
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}