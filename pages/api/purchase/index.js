const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1NAgB9AG24ltBVGC4bNPLE0i',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http:localhost:3000/purchase?success=true`,
      cancel_url: `http:localhost:3000/purchase?canceled=true`,
    });
  
    res.redirect(303, session.url);
  } else {
    // Handle any other HTTP method
  }
}