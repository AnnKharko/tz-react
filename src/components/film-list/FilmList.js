import React from "react";
import {FilmItem} from "../film-item";
import styles from './FilmList.module.css';

export const FilmList = ({items, onFilmClick})  => {
    console.log(items, 'from FilmList')
    return (
        <div className={styles.listWrapper}>
            {items.map(item => (
                <div
                    onClick={() => onFilmClick(item)}
                    className={styles.itemWrapper}
                    key = {item.id}>
                <FilmItem  {...item} />
            </div>
            ))}
        </div>
    )
}