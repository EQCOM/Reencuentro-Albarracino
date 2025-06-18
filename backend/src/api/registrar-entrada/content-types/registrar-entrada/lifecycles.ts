export default {
  async afterCreate(event) {
    const { result } = event;
    const email = result.userEmail;
    const name = result.userName;
    
    if (result.publishedAt) {
      strapi.log.info(`afterCreate disparado para ${result.userName} con ID: ${result.id}`);
      try {
          await strapi.plugin('email').service('email').send({
          to: email,
          subject: '🎟️ Confirmación de tu compra',
          html: `
            <p>Hola ${name},</p>
            <p>Gracias por tu compra. Aquí está tu entrada.</p>
          `,
          });
          strapi.log.info(`📩 Correo enviado a ${email}`);
          strapi.log.info(`Correo enviado para ID: ${result.id}`);
        } 
      catch (error) {
        strapi.log.error(`❌ Error al enviar correo a ${email}:`, error);
      }   
      }
    else {
      strapi.log.info(`Entidad con ID: ${result.id} es una versión borrador, no se envía correo.`);
    }
  },
};

  

