

function QuickActions({ actions }) {

    return (

        <div className="dashboard-panel">

            <h3>

                Quick Actions

            </h3>

            <div className="action-grid">

                {

                    actions.map(action => (

                        <button

                            key={action.title}

                            className={`action-btn ${action.color}`}

                            onClick={action.onClick}

                        >

                            {action.icon}

                            <br />

                            {action.title}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default QuickActions;