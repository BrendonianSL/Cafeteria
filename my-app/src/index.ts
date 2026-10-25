import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';

const app = new Hono()

const testUsername = 'Brendan'
const testPassword = 'Lewis'

app.use('/*', cors({
  origin: 'http://localhost:3000',
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST'],
  credentials: true,
}))

app.get('/login', (c) => {
  console.log('Get route for login was hit.')
  return c.text('Hello Hono!')
});

app.post('/login', async (ctx) => {
  const { username, password } = await ctx.req.json();

  if(username === 'Brendan' && password === 'Lewis') {
    return ctx.json({ message: 'Login successful' }, 200);
  } else {
    // return ctx.json({ message: 'Login failed' }).status(401);
  }
})

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})