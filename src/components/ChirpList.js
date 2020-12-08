import React, { useContext } from "react";
import Chirp from './Chirp';
import "./ChirpList.css";
import { ChirpContext } from '../contexts/ChirpContext';
import InfiniteScroll from 'react-infinite-scroll-component';

const ChirpList = () => {
    const { fireChirps, loader, handleOnLoadMore } = useContext(ChirpContext);

    return (
        <div>
            <InfiniteScroll
                dataLength={fireChirps.length}
                next={handleOnLoadMore}
                hasMore={true}
            >
                {
                    <div className="chirp-list row">
                        <div className='col-lg chirp-list-col'>
                            {fireChirps.map((chirp) => {
                                return <Chirp chirp={chirp} key={chirp.id} />;
                            })}
                        </div >
                    </div >
                }
            </InfiniteScroll>
            <div>
                {loader ? (
                    <div className="loader">
                        <span className="loader-content">
                            Loading_
                            </span>
                    </div>
                ) : (
                        ""
                    )}
            </div>
        </div>
    )
};
export default ChirpList;
