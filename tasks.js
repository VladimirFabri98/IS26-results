const tasks = [
  // ==========================================================
  // GENERAL ASSISTANCE
  // ==========================================================

  {
    id: "GA1",
    category: "general_assistance",
    name: "Professional Email Rewriting",
    maxTokens: 400,

    buildPrompt: () =>
      `
Rewrite the following email in a professional and respectful business tone. Correct grammatical and spelling errors, improve clarity and structure, and remove unnecessarily confrontational language. Preserve all important information, requests, deadlines, and priorities contained in the original message. Do not introduce any information that is not present in the original email. Keep the rewritten email concise and suitable for professional workplace communication.

EMAIL:

Hello Brian, I told you last week to send me the sales report for the first quarter and i still dont have them either on my email or my desk. This is irresponsible behaviour, I have no clue what were you doing last 2 days. Anyways, were meeting a delegation from the German branch soon and we have to get insurance profiles for the Tyrol region as fast as possible, dont waste any time, if youre working on something drop it and focus on this asap. Also, we have a commemoration ceremony on Saturday, our whole department is going there and noone should miss it, including you. Answer me as soon as you see this email, there is no time to waste!
`.trim(),
  },

  {
    id: "GA2",
    category: "general_assistance",
    name: "Meeting Notes Synthesis",
    maxTokens: 500,

    buildPrompt: () =>
      `
Transform the following informal meeting notes into a concise and structured meeting summary suitable for internal business communication.

Organize the information into:
1. Key Discussion Points
2. Decisions and Confirmed Information
3. Action Items and Responsible Persons
4. Unresolved Issues and Uncertainties
5. Next Steps

Preserve all relevant information. Clearly identify information that is uncertain, ambiguous, or requires confirmation rather than making assumptions. Do not introduce information that is not present in the notes.

MEETING NOTES:

Meeting Notes – Tuesday (or was it Wed??) Sync

ok so we met, most of us anyway, about the thing with the Q3-ish numbers. Dave joined late bc of the printer situation again lol. Sarah presented some slides, not sure if final version, might be v3 or v4, has the logo issue still.

Main point: budget is tight but not AS tight as last time, maybe like 12% under what we thought, or over, someone should double check that. The client (starts with M, not gonna type the whole name here) wants delivery pushed up, possibly to end of month, possibly first week of next month depending on how the vendor thing goes. Vendor is the one from the trade show, not the new one, the older contact, forgot his name starts with a K I think.

Action items (kind of):

- someone follow up on the shipment delay, might be 3-5 days or could be longer if customs does its thing
- Sarah to resend deck w real numbers this time
- Dave to check w finance re: the 12%-ish thing
- next meeting maybe Thursday?? or Friday, calendar invite tbd

Also mentioned briefly: new hire starting soon, could be next week, HR still finalizing paperwork, don't quote me on the date.

Ended kinda abruptly bc conference room got booked by another team. Will circle back.
`.trim(),
  },

  // ==========================================================
  // DOCUMENT PROCESSING
  // ==========================================================

  {
    id: "DP1",
    category: "document_processing",
    name: "Quarterly Report Executive Summary",
    maxTokens: 550,

    buildPrompt: ({ quarterlyReport }) => {
      requireInput("quarterlyReport", quarterlyReport);

      return `
Read the following quarterly business report and produce a concise executive summary for senior management.

Summarize the current state of production, sales performance, supply-chain issues, upcoming events, and competitive risks. Highlight the most important operational problems, deadlines, and decisions requiring management attention.

Clearly distinguish confirmed information from estimates, uncertainties, and unconfirmed information. Do not introduce information that is not contained in the report.

QUARTERLY REPORT:

${quarterlyReport}
`.trim();
    },
  },

  {
    id: "DP2",
    category: "document_processing",
    name: "Quarterly Report Action and Risk Extraction",
    maxTokens: 650,

    buildPrompt: ({ quarterlyReport }) => {
      requireInput("quarterlyReport", quarterlyReport);

      return `
Analyze the following quarterly business report and extract information requiring management attention.

Organize the response into four sections:
1. Required Actions
2. Deadlines and Time-Sensitive Items
3. Operational and Business Risks
4. Unresolved or Uncertain Information

For each item, identify the responsible person or department when explicitly stated in the report. Do not infer responsibility, deadlines, or facts that are not provided. Clearly mark approximate, uncertain, or unconfirmed information.

QUARTERLY REPORT:

${quarterlyReport}
`.trim();
    },
  },

  // ==========================================================
  // DATA ANALYSIS
  // ==========================================================

  {
    id: "DA1",
    category: "data_analysis",
    name: "Temporal Liquidity Analysis",
    maxTokens: 700,

    buildPrompt: ({ liquidityData }) => {
      requireInput("liquidityData", liquidityData);

      return `
Analyze the following market liquidity dataset. Each row represents aggregated liquidity observations for a specific UTC day-of-week and hour combination.

Identify:
1. strongest and weakest liquidity periods;
2. periods with greatest downside liquidity risk;
3. meaningful differences between average, median, P25 and P75 liquidity;
4. periods with unusually high spreads or low-liquidity rates;
5. recurring time-based patterns relevant for order execution.

Support conclusions with specific values. Distinguish data-supported patterns from possible interpretations. Do not invent missing observations or assume periods with few snapshots are representative.

Provide a concise final section with 3–5 practical execution-related recommendations.

DATASET:

${liquidityData}
`.trim();
    },
  },

  {
    id: "DA2",
    category: "data_analysis",
    name: "Failed Trade Liquidity Recovery Analysis",
    maxTokens: 700,

    buildPrompt: ({ liquidityRecoveryData }) => {
      requireInput("liquidityRecoveryData", liquidityRecoveryData);

      return `
Analyze the following dataset of failed live trade executions caused by insufficient executable market liquidity. Each row represents one failed trade and summarizes the available order-book observations after the failure.

Determine:
1. how frequently sufficient liquidity later returned to make the original order fully executable;
2. how quickly liquidity recovered when recovery occurred;
3. whether recovery behavior differs by strategy, failure timing, requested order size, or price cap;
4. whether failures appear primarily associated with temporary liquidity disappearance or prices moving beyond the permitted execution cap;
5. whether the evidence supports retrying failed orders and, if so, what retry behavior appears most justified.

Support conclusions with specific values and distinguish observations from recommendations.

Rows with zero post-failure snapshots represent missing follow-up data and must not be interpreted as cases where liquidity failed to recover. Post-failure snapshots are discrete observations rather than continuous market monitoring, so availability percentages must not be interpreted as percentages of elapsed time.

Finish with a concise assessment of practical implications for an automated order-execution system.

DATASET:

${liquidityRecoveryData}
`.trim();
    },
  },

  // ==========================================================
  // SOFTWARE DEVELOPMENT
  // ==========================================================

  {
    id: "SD1",
    category: "software_development",
    name: "Java Code Generation",
    maxTokens: 900,

    buildPrompt: () =>
      `
Implement the following functionality in Java 17.

A system receives a list of transactions. Each transaction contains:
- transaction ID
- customer ID
- transaction amount
- transaction status: COMPLETED, PENDING, or CANCELLED

Implement a service that:
1. ignores transactions that are not COMPLETED;
2. rejects transactions with a null customer ID or a non-positive amount;
3. calculates the total completed revenue for each customer;
4. counts the number of valid completed transactions for each customer;
5. returns customer summaries sorted by total revenue in descending order.

Create all necessary Java classes and provide a complete implementation that can be compiled with Java 17. Use appropriate data types and standard Java collections. Do not use external libraries or frameworks.

Briefly explain the main design decisions after the code.
`.trim(),
  },

  {
    id: "SD2",
    category: "software_development",
    name: "Java Debugging and Refactoring",
    maxTokens: 1000,

    buildPrompt: () =>
      `
Review the following Java code. It is intended to process completed orders, ignore invalid orders, aggregate revenue and order count by customer, and return the customer summaries sorted by total revenue from highest to lowest.

Identify all significant correctness, reliability, and efficiency problems in the implementation. Then provide a corrected and improved Java 17 implementation.

Preserve the intended functionality. Do not introduce external libraries or frameworks. After the corrected code, briefly explain each significant issue fixed.

JAVA CODE:

import java.util.*;

class Order {
    String customerId;
    double amount;
    String status;

    public Order(String customerId, double amount, String status) {
        this.customerId = customerId;
        this.amount = amount;
        this.status = status;
    }
}

class CustomerSummary {
    String customerId;
    double total;
    int count;

    public CustomerSummary(String customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return customerId + ": " + total + " (" + count + ")";
    }
}

public class OrderAnalyzer {

    public static List<CustomerSummary> analyze(List<Order> orders) {

        List<CustomerSummary> results = new ArrayList<>();

        for (Order order : orders) {

            if (order.status == "COMPLETED") {

                if (order.customerId == null && order.amount <= 0) {
                    continue;
                }

                CustomerSummary summary = null;

                for (CustomerSummary s : results) {
                    if (s.customerId == order.customerId) {
                        summary = s;
                    }
                }

                if (summary == null) {
                    summary = new CustomerSummary(order.customerId);
                    results.add(summary);
                }

                summary.total += order.amount;
                summary.count++;
            }
        }

        results.sort(
            (a, b) -> (int) (a.total - b.total)
        );

        for (CustomerSummary s : results) {
            if (s.total == 0) {
                results.remove(s);
            }
        }

        return results;
    }
}
`.trim(),
  },
];

function requireInput(name, value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Benchmark task requires input "${name}".`);
  }
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

module.exports = {
  tasks,
  getTaskById,
};
