import React from 'react';
import {CgSmileSad} from 'react-icons/cg'
import * as styles from './pageUnavailable.module.css'
function PageUnavailable(props) {
    return (
        <div className={styles.PageUnavailableContainer}>
         
            <CgSmileSad size="5vw"/>
         
         <div className={styles.errMsg}> Page could not be loaded. please try again later. </div> 
        </div>
    );
    }


  


export default PageUnavailable;