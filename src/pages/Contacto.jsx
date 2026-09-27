import { useState } from 'react';

/**
 * Página de contacto con formulario validado
 */
const Contacto = () => {
    
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    const [mensajeFormulario, setMensajeFormulario] = useState({
        texto: '',
        clase: ''
    });

    /**
     * Maneja cambios en los inputs del formulario
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Valida y procesa el envío del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        const { nombre, correo, mensaje } = formData;

        // Validar nombre vacío
        if (nombre.trim() === '') {
            setMensajeFormulario({
                texto: 'Por favor ingrese su nombre',
                clase: 'mensaje-error'
            });
            return;
        }

        // Validar nombre muy corto
        if (nombre.trim().length < 3) {
            setMensajeFormulario({
                texto: 'El nombre debe tener al menos 3 caracteres',
                clase: 'mensaje-error'
            });
            return;
        }

        // Validar correo vacío
        if (correo.trim() === '') {
            setMensajeFormulario({
                texto: 'El correo no puede estar vacío',
                clase: 'mensaje-error'
            });
            return;
        }

        // Validar formato de correo
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoCorreo.test(correo)) {
            setMensajeFormulario({
                texto: 'Por favor ingrese un correo válido',
                clase: 'mensaje-error'
            });
            return;
        }

        // Validar mensaje vacío
        if (mensaje.trim() === '') {
            setMensajeFormulario({
                texto: 'Por favor escriba su mensaje',
                clase: 'mensaje-error'
            });
            return;
        }

        // Validar mensaje muy corto
        if (mensaje.trim().length < 10) {
            setMensajeFormulario({
                texto: 'El mensaje debe tener al menos 10 caracteres',
                clase: 'mensaje-error'
            });
            return;
        }

        // Si pasa todas las validaciones
        setMensajeFormulario({
            texto: '¡Mensaje enviado correctamente!',
            clase: 'mensaje-exito'
        });

        // Limpiar formulario
        setFormData({
            nombre: '',
            correo: '',
            mensaje: ''
        });
    };

    return (
        <main>
            <section className="contacto">
                <h2>Contacto</h2>
                <p>¿Tienes alguna consulta? Escríbenos y te responderemos.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />

                    <label htmlFor="correo">Correo:</label>
                    <input 
                        type="text"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                    />

                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea 
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit">
                        Enviar mensaje
                    </button>
                </form>

                {/* Renderizado condicional del mensaje */}
                {mensajeFormulario.texto && (
                    <p id="mensajeFormulario" className={mensajeFormulario.clase}>
                        {mensajeFormulario.texto}
                    </p>
                )}
            </section>
        </main>
    );
};

export default Contacto;