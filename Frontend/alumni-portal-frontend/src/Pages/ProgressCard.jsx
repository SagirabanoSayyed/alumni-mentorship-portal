

function ProgressCard({

    title,

    completed,

    total

}) {

    const percent =

        total === 0

            ? 0

            : Math.round((completed / total) * 100);

    return (

        <div className="dashboard-panel">

            <h3>

                {title}

            </h3>

            <div className="progress">

                <div

                    className="progress-bar bg-success"

                    style={{

                        width: `${percent}%`

                    }}

                >

                </div>

            </div>

            <br />

            <strong>

                {completed}

            </strong>

            {" / "}

            {total}

        </div>

    );

}

export default ProgressCard;