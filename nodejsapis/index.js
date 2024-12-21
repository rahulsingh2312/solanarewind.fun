const axios = require('axios');

// Parse the wallet addresses from the input JSON
const walletData = {
  "wallets": [
    "2D1qfhoyvbFTTXS1xwe1RKVWCQifjvPqEpFqQXk1Veow",
    "2qbfvNp1XXskuAFakez5EKDvWv1gxoJ49948xKiEScZa",
    "2VptbNFuUnZTJDy3rq5bsHiovaa5MStdnkWRMw2L6FGS",
    "2xYCgbTc5qvc4Z6Mj5Kpeiee3XJmpSwBSztiofTmaDk5",
    "372sKPyyiwU5zYASHzqvYY48Sv4ihEujfN5rGFKhVQ9j",
    "37d4QXe55WxeMfuKMur2p68EkLwAw8DMujJNcxtB5apL",
    "3bqJvyjdKF9QybSYHqB6YcFD9u1d2ZKtyNqFPHiZbvbX",
    "3LE9jvqypoYk6rrjB53Fj14xHMvGsHdCkqjxnboSXhmh",
    "3pBor9QZvYu2G9B5UJSuy6R6M2mAwxKJXSeEkDrXfkBi",
    "3PxgLSfbDdkkWDw9FsWBKf8jBXyr4tVRvKy5kzQgnNdB",
    "3Qfyy24kQxxV2gX8JZuPk4dDc7tUBHdNYPeiC2Qnobgz",
    "3tjYZeaR1urzvuRnfATMuJcok3AaPctgR3o8oQhXKarG",
    "3XjkhRZAMDpQUx89w5vav3tEvzjCL38Xw3Wh2qTHc7mL",
    "4cmX6bwJ8ZMiJL4zgnbhRTBajkz54smzWEjUWrugXYZM",
    "4eMBfTeCC42e1VMkypLnX4GjHLuDqSWsCyxxMMjE8aDe",
    "4hqCyFWg1nSw5egumsC21wo5hAoQ6y2rXJbq5iMCkMd7",
    "4iG4s2F3eSByCkMvfsGhrvzXNoPrDFUJuA7Crtuf3Pvn",
    "4KPdmkbr2a5hcdy8G6WN1UzgiQvtUqt5xMh8kQsnfrpC",
    "4Krmc1VDKkcmtrr3nb8uYgTAp7JpE6ho8HhhVx3Tux8S",
    "4N4Csrm4D6VCkpTPQa5f7Wbqdf6nFeBFWuMACwSNxiGh",
    "4PkRGiU43kTKcpbszwpS3i6WoLSPsoSGYx6ZG2ArS3Bv",
    "4WEkZJprSsHxadCitfqNdVS3i44sgTP41iETZe4AzS92",
    "5AunacoWuq1ZDYsDxrRmUbYvrQ789pkj2GTAgV54Dd9B",
    "5MGB6wZvpUwe7htuiTjwsz1YpnQUogBUHD5XrUQ3Y1U5",
    "5PTzRVufPqm3M3xTxq2AAkPhq1XxhmrW6LgQBunxJFvS",
    "5qEeJAoeoNgMZjaQSHzBPGPBBhw2m7MKXi5Cw8CvPEsa",
    "63igYU3vgfLrpnBXtKYzbxawXT5Yxu5Kb8Drwyu9Y82q",
    "64866ERAEXZ8fgFe2SDXb6kYFpva8royU4pbUcRqhXHX",
    "6dQabrWGcUmr1HNBxb4SMsuQV9spaPt3UxNn3acnTuD7",
    "6qY5wbicRWythdFri23foVsiqoFT9zH2jhb9aHwDt3E6",
    "6vaLuvKP79jqRhzAhS7Frbd5CutxsETRbMVbANYZQ2Sg",
    "6ZGEhPEiAS1urNPY1XQZrUrAeYiDVkQCV6pixHAy6GMy",
    "74XLyXQtCrTpKpQybceGvP4fGqu84jX9idfzxeEaBrR7",
    "7agD7vBwkD7YXfuC3B419WGZd3rcWhT4KqRoQQqnxi8U",
    "7ddmkKWNDR1i4dcKb3UDU5nnRmqDpt89MLMVDytFxfQV",
    "7waXKmc8zAM8vj7jKh1hcxdrVYi7QLCJRf1rNh5e8Hou",
    "7WMJGbC8vKwZZUe7jVcPRae5GPBenMXihhEQtz1LSdoZ",
    "7xUGbu5qU878pjzMMBoWxijpHhANDReyLbPDH4L5DWzF",
    "7Y6vtf4dWEkS3qW214MwdPGkgTd9kHqkg2SuqNn1Yiab",
    "8Fy7yHo7Sn7anUtG7VANLEDxCWbLjku1oBVa4VouEVVP",
    "8GRiuDvH8dL2UDNbyzEDQQekvdXiQuC9bwyLcXdKwDM8",
    "8KKKrNuzXF9kpRHUZTo19wAbCSkgzifGJ7feC3R9yHdT",
    "8MNCX8BvRTLjRmszhe7EZ2rQ9PRKK3mk1wnk6fTUh4nx",
    "8NN6WmoVd8F5Wt56KkSQM5NL9gWXCqHGEkXrquezhBdi",
    "8TsQWiAb6ba5mZEhBoRbgp8KW427u9jhud9uMjsbQupz",
    "8ueAQRiLExT7M9CNSkR11FDGbx2UyJqpSxCp1y43PWWs",
    "91AnuDnGgDxXXrDqE5rTXP3KVuFUGNB87XQpcvgjes5z",
    "91Q1XdVxobuAjX8vcKj4PruC7KZsaEL3cU5cH61WyDmw",
    "9jAbW4AVyUjwd18BruCVM6JbHmvgwtY51U2iARFmCFqf",
    "9LWNbmY4APwgZ8LvR2WnGZbdEtsLapxfqhK4xPAbr98A",
    "9psE5i62kpJBxwgXE2DJN3QuGxMaSgfgKrsxS57jusWs",
    "9W9QHEBfx6fiZNqzMNrRWWZc3FAQcqyX64smYBd12gXA",
    "AkEHR2G5PjzWUMRVX2Mo7M17MHuXPxRsJGco2r22nCH8",
    "Arpt8VaPQPku7gVtA9pe3QYRUvzBnBwPy2F7trmYhfVf",
    "B5ux1EHziMXkfQHEtrmu9A5mC4YosGaeVP5yruXrxLbS",
    "B6QNVozKLottCP3Zk8ynANbxtBgP1dBybZTswEA4hj4",
    "BdHi82pLTpRAuZd9EFYVbGMSoKpZxkQG3uJzGwS3Ncp6",
    "BK2Wf3ddc7upPCsRwhV1mRhooGMzNUVczxBkDDbJLUaY",
    "BPNsJ2GjVNURT7WRJ2HdiZMaPCrDtoPDFhGv6qTJvCsK",
    "C3vfw3AeoXRP2XCUgW18dQBNLdtcdNMSzv7p8oo3i5dU",
    "CBS5bN8TRPGALiPRfxJnjuSrYh9GYN699qiZUimxgNwi",
    "cdhJmChbj9ASguK6CKvjN7qnvnpPAHsxMZjcuSVMYUQ",
    "CEQenwAuKRfXGxzHoGzj76EF5LkmZw9FYLSYwhBL3hwT",
    "CprLQM9qUgyXRdBB1KPKxJsQfSgheEugMZV455xYx5KD",
    "CzRCPSCqLCgDH3a3GPcFeUbhaQ39KHKy6Z45itt4sp4B",
    "CztRNUjoAWDHpB1oNkGnQvry6SjAtoUR7hMSejDXV71i",
    "Dbu85RcgtwfSmGATyo3pzM5gHst5NwgtzAzoqRoiNvkd",
    "E2pjP14kgArbr3oSmq4isp9xZG9yD5DndUnXAqWisCh1",
    "E8ysZkqQX9dgbadKcDALVa7qpyPiVJS7xjV7JL5D6j8g",
    "ECrx8ZzGDjYNWU8iXDuJmcxQmxtGp6zDiqra4MQJobnJ",
    "EREpyKwZQZFyPuwZpVrDa6by3XdtxM4DpCdT9W5WGezo",
    "Ey85NUDkZQkZRPP48TihWp5CdrnL6rvG2fdpLF8cK2wB",
    "EYsJVQU5igQNaNMptsyL2A6h6QWso34MYxTriAkdQqWj",
    "FSvxASBBE9E22SugSBBKcw4NEvfgTSik6vvjBSaZNaET",
    "G293LJTxXn81YUXMGLo2knP4ZfGjChUqzNFwJufWzCEd",
    "Gm8NfyKMwvBN1UXRgXQShtiNA182bgLBTj1uNvp1H3ie",
    "GqkJ3UoKTScvXiaJUxrGJ9QD847LAj2DTvMzqjaT2tJm",
    "GxCJ5iHEbiNu3WYpaRdFrQde7oiRcg5PCSbJYjRq2XEy",
    "GZq4YwM3vygChGWygSTx6nLAPjzmJ4Xdnw9RrbGHvnNx",
    "He7qYfzFh8ve5szBUGGcHc9fU25g9p45NVa29ezHLBjy",
    "HfBAWt2cKzvVJkxD3kWXwX4hd4j1xPFVRUWs2joS6b6P",
    "HfgURUsL7RHZmSvsNu2J8dHWwamKsCLrM3KzPJk7AizZ",
    "HGSJUfH6nafuGr3oQLbtVRqWmoMMU7ngYMxy6mEtRxe6",
    "HLKZXhTBKvVDwFk3YG766eiroCAJnjpHBBmFKGZcjqxd",
    "HViWJEPY2BYdi8JCaoLiPKHFaEByfPgk1LpknmBSpgVR",
    "J4eFCFKoxBvijx1M9kDyTdcwy1Gex2PPEu51WTCZi2Zd",
    "J5JwLC3bsQvqfWCuWtfX7dTN7Atopz8DK8kxpQLtXopa",
    "M6wEw5Dy62EWx67HbnLw5VQ4eaZmydXa48Ahx7LzKSG",
    "qtNiueydAgojxZcByt6GCCJ7Qq89nyZEYhCSZ2ajF3G",
    "sex2fesLPWc8yqQNJuV5QbWMZWkmomeG68FcnFHwmBe",
    "tXxzhBV56CHPSwVP1z3PsyLCfToNwxVsr1B8xQdan41",
    "WzgRQLDFNiUB2Vx6e7H8VNGSBR5jtybanNnP4QkgSoP"
  ]
};

async function analyzeWallet(walletAddress) {
  try {
    const response = await axios.get(`https://server.solanawrapped.me/analyze/${walletAddress}`);
    if (response.data.success && response.data.data.metrics) {
      const totalFees = response.data.data.metrics.totalFeesPaid;
      console.log(`Wallet: ${walletAddress} - Total Fees Paid: ${totalFees} SOL`);
      return {
        wallet: walletAddress,
        fees: totalFees
      };
    }
    return null;
  } catch (error) {
    console.error(`Error analyzing wallet ${walletAddress}:`, error.message);
    return null;
  }
}

async function analyzeAllWallets() {
  // First, verify the wallets are processed
  try {
    await axios.get('https://server.solanawrapped.me/processed-wallets/list');
  } catch (error) {
    console.error('Error checking processed wallets:', error.message);
    return;
  }

  // Create an array of promises for all wallet analyses
  const analysisPromises = walletData.wallets.map(async (wallet) => {
    // Add a small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    return analyzeWallet(wallet);
  });

  // Wait for all analyses to complete
  const results = await Promise.all(analysisPromises);

  // Filter out null results and sort by fees
  const validResults = results.filter(result => result !== null);
  const sortedResults = validResults.sort((a, b) => b.fees - a.fees);

  // Print summary
  console.log('\nWallet Analysis Summary:');
  console.log('------------------------');
  sortedResults.forEach((result, index) => {
    console.log(`${index + 1}. Wallet: ${result.wallet}`);
    console.log(`   Fees Paid: ${result.fees} SOL`);
  });

  // Calculate total fees
  const totalFees = sortedResults.reduce((sum, result) => sum + result.fees, 0);
  console.log('\nTotal Fees Paid Across All Wallets:', totalFees.toFixed(6), 'SOL');
}

// Run the analysis
analyzeAllWallets().catch(console.error);