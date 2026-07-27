import "./StatsCard.css";

function StatsCard({
    title,
    value,
    icon,
    color,
    footer
}) {

    return (

        <div className="stats-card">

            <div className="stats-header">

                <div>

                    <div className="stats-title">
                        {title}
                    </div>

                    <div className="stats-value">
                        {value}
                    </div>

                </div>

                <div className={`stats-icon ${color}`}>
                    {icon}
                </div>

            </div>

            {footer && (

                <div className="stats-footer">

                    {footer}

                </div>

            )}

        </div>

    );

}

export default StatsCard;