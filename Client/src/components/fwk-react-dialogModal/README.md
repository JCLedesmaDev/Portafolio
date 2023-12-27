<DialogModal
    isOpen={modal}
    onCancel={onCancel}
    onAccept={onAccept}
    message='¿Está seguro que desea guardar los cambios realizados? '
/>

############################

<DialogModal isOpen={modal}>
    <div id="header">
        <h2>Datos del Log</h2>
    </div>
    <div id="body" className={css.dialogBody}>
        {Object.entries(data)?.map(([key, value]) => (
            <JSONViewerItem
                key={key}
                name={key}
                value={value}
                depth={depth}
                expandObj={true}
            />
        ))}
    </div>
    <div id='footer'>
        <button onClick={() => setModal(false)}>Cerrar</button>
    </div>
</DialogModal>

############################