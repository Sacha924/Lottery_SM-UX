# Lottery

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Chainlink Automation

In a Chainlink oracle contract, the checkUpkeep and performUpkeep functions are used to manage the maintenance and upkeep of the oracle.

The checkUpkeep function is called periodically to check the status of the oracle and perform any necessary maintenance tasks. This can include checking the balance of the contract, ensuring that the oracle is still connected to the Chainlink network, and performing any other tasks that are necessary to keep the oracle running smoothly.

The performUpkeep function is called by the checkUpkeep function to perform the actual maintenance tasks. This function should contain the code that performs the necessary maintenance tasks, such as checking the balance and connectivity of the oracle.

In general, the checkUpkeep function is responsible for deciding when maintenance tasks need to be performed, while the performUpkeep function is responsible for actually performing those tasks.

By regularly checking and performing the necessary maintenance tasks, these functions help ensure that the oracle contract remains operational and able to provide accurate data to its clients.

https://docs.chain.link/vrf/v2/subscription

0x96cFfb77D940bFCA38dD35E210BEFfE6556d71dC

## others

we will connect our dapp to a wallet using react-moralis

npm add moralis react-moralis