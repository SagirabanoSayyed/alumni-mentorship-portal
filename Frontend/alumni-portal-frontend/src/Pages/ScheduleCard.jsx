

function ScheduleCard({

    sessions

}) {

    return (

        <div className="dashboard-panel">

            <h3>

                Today's Schedule

            </h3>

            {

                sessions.length === 0 ?

                    (

                        <p>

                            No sessions scheduled today.

                        </p>

                    )

                    :

                    (

                        sessions.map(session => (

                            <div

                                key={session.id}

                                className="schedule-item"

                            >

                                <div>

                                    <div className="schedule-title">

                                        {session.topic}

                                    </div>

                                    <div className="schedule-time">

                                        {session.time}

                                    </div>

                                </div>

                                <div className="schedule-status">

                                    {session.status}

                                </div>

                            </div>

                        ))

                    )

            }

        </div>

    );

}

export default ScheduleCard;