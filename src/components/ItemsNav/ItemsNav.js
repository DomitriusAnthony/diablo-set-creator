import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import ItemAccordian from './ItemAccordian/ItemAccordian';

const FieldsetNavContainer = styled.fieldset`
    display: flex;
    flex-direction: column;
    width: 12.5%;
    background: #281D19;
    border: 4px solid #2F2C29;

    & legend {
        font-size: 1.4rem;
        color: white;
        ;
    }
`

const Item = styled.div`
    height: 10rem;
    width: 99%;
    border: 1px solid green;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const GET_CLASS_FROM_CHARACTER = gql`
    {
        userCharacters @client {
            characterClass
        }
    }
`;

const GET_ITEMS = gql`
    {
        items @client{
            id
            name
            slots
            icon
            setName
            type {
                id
                twoHanded
            }
        }
    }
`;



const ItemsNav = (props) => {
    const { currentCharacter } = props;
    
    return (
        <Query query={GET_CLASS_FROM_CHARACTER}>
            {({ data })=> {            
                return (
                    <Query query={GET_ITEMS}>
                        {({ data }) => {                            
                            const { items } = data;
                            return (
                                <FieldsetNavContainer>
                                    <legend>Items</legend>                                    
                                    {items.map((item) => {  
                                        const { characterClass } = currentCharacter;  
                                        const trimClass = characterClass.replace(/\s/g, '')                                             
                                        if (item.type.id.includes(trimClass)) {
                                            return <ItemAccordian key={currentCharacter.id} currentCharacter={currentCharacter} {...item} />
                                        } 
                                    })}
                                </FieldsetNavContainer>
                            )
                        }}
                    </Query>
                )
            }}
        </Query>
    )
}

export default withRouter(ItemsNav);