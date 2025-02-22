const PageHeader = (props) => {
    const { title, actions } = props;
    return (
        <div className="page-header">
            <div className="row align-items-center">
                <div className="col">
                    <h1 className="fs-3 mb-0">{title}</h1>
                </div>
                {
                    actions &&
                    <div className="col-auto">
                        <div className="page-actions">  
                            {actions}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default PageHeader;