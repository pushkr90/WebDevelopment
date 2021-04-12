const Demo = ( {newName, children} ) =>
{    
    return(
        <div className="container">
            <ul>
                <li>{newName} are boring - {children}</li>
            </ul>
        </div>
    );
};
export default Demo;