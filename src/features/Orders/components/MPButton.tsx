// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
// // import { useEffect } from 'react';

// // Reemplaza con tu Public Key de Mercado Pago (la de Vendedor de prueba)
// initMercadoPago('APP_USR-tu-public-key-aqui', {
//   locale: 'es-AR'
// });

// interface Props {
//   preferenceId: string;
// }

// export const MercadoPagoButton = ({ preferenceId }: Props) => {
//   return (
//     <div className="w-full mt-6">
//       <Wallet 
//         initialization={{ 
//           preferenceId: preferenceId,
//           redirectMode: 'self' //modal, blank Abre el pago en un modal sin salir de tu web
//         }}
//         customization={{
//         //   texts: {
//             // valueProp: 'smart_option' // Muestra leyendas de cuotas, etc.
//         //   },
//           visual: {
//             buttonBackground: 'black', // Puedes elegir 'default', 'black', 'blue'
//             borderRadius: '10px',
            
//           }
//         }}
//       />
//     </div>
//   );
// };